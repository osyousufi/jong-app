import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Text,
  Header,
  Input,
  Button,
  Card,
} from 'react-native-elements';

import { WorkoutContext } from '../contexts/WorkoutContext';


const ExerciseItem = ({id, getData}) => {

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseWeight, setExerciseWeight] = useState(45);
  const [exerciseCount, setExerciseCount] = useState('5x5');

  const dataStructure = {
    id: id,
    name: exerciseName,
    weight: exerciseWeight,
    count: exerciseCount,
  };

  //calling getdata on state change to update parent
  useEffect(() => {
    getData(dataStructure)
  })

  return (
    <Card style={styles.inputContainer}>
      <Input
        placeholder={`Untitled Exercise`}
        value={exerciseName}
        onChangeText={setExerciseName}
        label={'Exercise Name'}
      />
      {/*change to number pad*/}
      <Input
        keyboardType={"decimal-pad"}
        placeholder={`45`}
        value={exerciseWeight.toString()}
        onChangeText={setExerciseWeight}
        label={'Weight (lbs)'}
      />
      {/*change to dropdown menu*/}
      <Input
        placeholder={`5x5`}
        value={exerciseCount}
        onChangeText={setExerciseCount}
        label={'Sets x Reps'}
      />
    </Card>
  )
}

const ConfigureWorkoutsScreen = ({navigation}) => {

  const {workoutData, setWorkoutData} = useContext(WorkoutContext);
  const [inputs, setInputs] = useState([0, 1, 2]); //for later dynamic inputs

  const [workoutName, setWorkoutName] = useState('');
  const [exerciseData, setExerciseData] = useState([]);

  //getting data from child (ExerciseItem)
  const getData = (childData) => {

    let _exerciseData = exerciseData;
    let exerciseObj = exerciseData.find(obj => obj.id == childData.id);
    let exerciseObjIdx = _exerciseData.indexOf(exerciseObj);

    if(exerciseObj !== undefined) {
      _exerciseData[exerciseObjIdx].name = childData.name;
      _exerciseData[exerciseObjIdx].weight = childData.weight;
      _exerciseData[exerciseObjIdx].count = childData.count;

    } else {
      _exerciseData.push(childData);
    }

    setExerciseData(_exerciseData);
  }



  return (
    <View style={styles.container}>
      <Input
        placeholder='Workout Name'
        onChangeText={setWorkoutName}
        value={workoutName}
      />

      <ScrollView style={styles.inputsContainer}>
        {inputs.map((value, index) => {
          return <ExerciseItem key={index} id={index} getData={getData} />
        })}
      </ScrollView>

      <Button
        onPress={() => {
          setWorkoutData([...workoutData, {id: workoutData.length !== 0 ? workoutData[workoutData.length - 1].id + 1 : 0, name: workoutName, data: exerciseData}])
          navigation.navigate('Home');
        }}
        title="Add"
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
  container: {
    flex: 1,
    padding: 20,
  },
  inputsContainer: {
    flex: 1, marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "lightgray"
  },
});

export default ConfigureWorkoutsScreen;
