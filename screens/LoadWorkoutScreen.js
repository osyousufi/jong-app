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


import { WorkoutContext } from '../contexts/WorkoutContext';

const InteractableExerciseItem = ({data}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Tracker', {paramData: data, screenState: 'NEW'});
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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(workoutData[0]);
  const [items, setItems] = useState([]);

  const [exerciseData, setExerciseData] = useState([]);

  const getStructuredDropdownData = () => {

    let _items = items;
    for (let workoutObj of workoutData) {

      let itemStructure = {
        label: '',
        value: '',
      }
      itemStructure.label = workoutObj.name;
      itemStructure.value = JSON.stringify(workoutObj.data);
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
    // console.log(route.params.screenState)
  }, []);

  const getData = (childData) => {

    //
    // let _exerciseData = exerciseData;
    // let exerciseObj = _exerciseData.find(obj => obj.id === childData.id);
    // let exerciseObjIdx = _exerciseData.indexOf(exerciseObj);
    //
    //
    // if(exerciseObj !== undefined) {
    //   _exerciseData[exerciseObjIdx].trackerData = JSON.parse(childData.data);
    // }
    //
    // // console.log(_exerciseData)
    // setExerciseData(_exerciseData);

  }

  const handleDataSave = (data) => {
    let _exerciseData = exerciseData;
    let exerciseObj = _exerciseData.find(obj => obj.id === data.id);
    let exerciseObjIdx = _exerciseData.indexOf(exerciseObj);

    if(exerciseObj !== undefined) {
      _exerciseData[exerciseObjIdx] = data;
    }
    setExerciseData(_exerciseData);
  }

  useEffect(() => {
    handleDataSave(route.params?.trackerData);
  }, [route.params?.trackerData]);

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
            setExerciseData(JSON.parse(v));
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
          exerciseData.map((obj, idx) => {
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

          console.log(exerciseData)
          // console.log(route.params.trackerData)
          // handleDataSave(route.params.trackerData);
          // console.log(exerciseData)
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
