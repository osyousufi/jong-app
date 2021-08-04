import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Header,
  Input,
  Button,
  Card,
} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';


import { WorkoutContext } from '../contexts/WorkoutContext';


const LoadWorkoutScreen = ({route, navigation}) => {


  const {workoutData, setWorkoutData} = useContext(WorkoutContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const getStructuredData = () => {

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
    getStructuredData();
  }, [workoutData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.dateString}`,
    })
  });

  const InteractableExerciseItem = () => {
    return (
      <Text>yeah</Text>
    )
  }

  return (
    <View>

      <DropDownPicker
        placeholder="Select a workout"
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        items={items}
        setItems={setItems}
        onChangeValue={(value) => {
          // console.log(`SELECTED_CALENDAR_DAY: ${JSON.stringify(route.params)} SELECTED_DROPDOWN_VALUE: ${value}`);
          console.log(`SELECTED_DROPDOWN_VALUE: ${value}`);
        }}
        zIndex={3000}
        zIndexInverse={1000}
        style={{
          marginTop: 10,
          MarginBottom: 10,
        }}
      />

    </View>
  )
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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
