import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
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

const ExerciseItem = ({id, getData, workoutParams}) => {

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseWeight, setExerciseWeight] = useState(45);
  const [exerciseCount, setExerciseCount] = useState('5x5');

  useLayoutEffect(() => {
    if (workoutParams.screenState === 'EDIT') {
      setExerciseName(workoutParams.paramData.data[id].name);
      setExerciseWeight(workoutParams.paramData.data[id].weight);
      setExerciseCount(workoutParams.paramData.data[id].count);
    }
  }, [workoutParams.screenState]);

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
        maxLength={35}
      />
      {/*change to number pad*/}
      <Input
        keyboardType={"decimal-pad"}
        placeholder={`45`}
        value={exerciseWeight.toString()}
        onChangeText={setExerciseWeight}
        label={'Weight (lbs)'}
        maxLength={4}
      />
      {/*change to dropdown menu*/}
      <Input
        placeholder={`5x5`}
        value={exerciseCount}
        onChangeText={setExerciseCount}
        label={'Sets x Reps'}
        maxLength={7}
      />
    </Card>
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

export default ExerciseItem;
