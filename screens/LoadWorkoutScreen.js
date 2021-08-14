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
} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';


import { WorkoutContext } from '../contexts/WorkoutContext';


const InteractableExerciseItem = ({data}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Tracker', {paramData: data});
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


// <Text>{trackerData.data.id === data.id ? JSON.stringify(trackerData) : null}</Text>
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
      <ScrollView style={{marginTop: 100, marginBottom: 100}}>
        {
          exerciseData?.map((obj, idx) => {
            return (
              <InteractableExerciseItem
                key={idx}
                data={obj}
              />
            )
          })
        }
      </ScrollView>

      <Button
        title='Save'
        onPress={() => {
          navigation.navigate('Calendar', {date: route.params?.calendarData.dateString, exerciseData: exerciseData, workoutName: currLabel});
        }}
      />

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
  },
  highlight: {
    fontWeight: '700',
  },
});

export default LoadWorkoutScreen;
