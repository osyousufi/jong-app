import React, {useState, useContext, useEffect, useLayoutEffect, Fragment} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Text,
  Header,
  Input,
  Button,
  Card,
  Icon,
} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';


import { WorkoutContext } from '../contexts/WorkoutContext';


const InteractableExerciseItem = ({data, date}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Tracker', {date: date, paramData: data});
      }}
    >
      <Card>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Card.Title style={{textAlign: 'left'}}>
              {data.name}
            </Card.Title>
          </View>
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'right', textDecorationLine: 'underline'}}>
              {`${data.count} ${data.weight}lb`}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

const LoadWorkoutScreen = ({route, navigation}) => {

  const {workoutData, setWorkoutData} = useContext(WorkoutContext);
  const [exerciseData, setExerciseData] = useState(
    route.params?.screenState === 'EDIT' ? route.params?.exercisePayload : []
  );

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(workoutData[0]);
  const [items, setItems] = useState([]);
  const [currLabel, setCurrLabel] = useState(null);

  const getStructuredDropdownData = () => {

    let _items = items;
    for (let workoutObj of workoutData) {

      let itemStructure = {
        label: '',
        value: '',
      }

      itemStructure.label = workoutObj.name;
      itemStructure.value = JSON.stringify( {id: uuid.v4(), name: workoutObj.name, data: workoutObj.data} );
      _items.push(itemStructure);
    }

    setItems(_items);
  }

  useEffect(() => {
    getStructuredDropdownData();
  }, [workoutData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params?.calendarData.dateString}`,
    });
  }, []);

  const handleDataSave = () => {
    let _exerciseData = exerciseData;
    let exerciseObj = _exerciseData.find(obj => obj.id === route.params?.trackerPayload.id);
    let exerciseObjIdx = _exerciseData.indexOf(exerciseObj);

    if(exerciseObj !== undefined) {
      _exerciseData[exerciseObjIdx].trackerData = route.params?.trackerPayload.data;
    }
    setExerciseData(_exerciseData);
  }

  useEffect(() => {
    if (route.params?.trackerPayload !== undefined) {
      handleDataSave();
    }
  }, [route.params?.trackerPayload]);

  return (
    <Fragment>
      <View style={styles.sectionContainer}>
        <DropDownPicker
          placeholder="Select a workout"
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          items={items}
          setItems={setItems}
          onChangeValue={(v) => {
            setExerciseData(JSON.parse(v).data);
            setCurrLabel(JSON.parse(v).name);
          }}
          zIndex={3000}
          zIndexInverse={1000}
          containerStyle={{
            width: '90%',

          }}
        />
      </View>

      <View style={{marginBottom: 50}}>
        <Text style={styles.sectionDescription}>Press an exercise to keep track of sets & reps.</Text>
        <ScrollView style={{marginBottom: 50}}>
          {
            exerciseData?.map((obj, idx) => {
              return (
                <InteractableExerciseItem
                  key={idx}
                  data={obj}
                  date={route.params?.calendarData.dateString}
                />
              )
            })
          }
        </ScrollView>

          <View style={{alignItems: 'center'}}>
            <Button
              title='Save'
              onPress={() => {
                navigation.navigate('Calendar', {date: route.params?.calendarData.dateString, exerciseData: exerciseData, workoutName: currLabel});
              }}
              buttonStyle={{backgroundColor: 'darkslateblue'}}
              containerStyle={{width: '50%', marginBottom: 50}}
            />
          </View>
      </View>

    </Fragment>
  )
}


const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
  },
  highlight: {
    fontWeight: '700',
  },
});

export default LoadWorkoutScreen;
