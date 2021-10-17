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
import InteractableExerciseItem from '../components/InteractableExerciseItem';


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
      <View style={{flex: 1, alignItems: 'center', marginTop: 50, marginBottom: 10}}>
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

      <View style={{marginBottom: 100, marginTop: 50}}>

        <ScrollView>
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
        <View style={{flexDirection: 'row', margin: 15}}>
          <Icon
            color={'darkslateblue'}
            type={'font-awesome'}
            name={'lightbulb-o'}
            containerStyle={{paddingRight: 10}}
          />
          <Text style={{fontSize: 18, fontWeight: '400'}}>Tap an exercise to keep track of sets & reps.</Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
          <Button
            title='Save'
            onPress={() => {
              navigation.navigate('Calendar', {date: route.params?.calendarData.dateString, exerciseData: exerciseData, workoutName: currLabel});
            }}
            buttonStyle={{backgroundColor: 'darkslateblue'}}
            containerStyle={{width: '50%', marginBottom: 10}}
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
    // marginTop: 15,
    fontSize: 18,
    fontWeight: '400',
    // textAlign: 'center'
  },
  highlight: {
    fontWeight: '700',
  },
});

export default LoadWorkoutScreen;
