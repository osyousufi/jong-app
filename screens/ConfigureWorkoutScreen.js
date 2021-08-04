import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Button,
} from 'react-native';
import {
  Text,
  Header,
  Input,
  Card,
  Icon,
} from 'react-native-elements';

import { WorkoutContext } from '../contexts/WorkoutContext';
import EditableExerciseItem from '../components/ExerciseItem';

const ConfigureWorkoutScreen = ({route, navigation}) => {

  const {workoutData, setWorkoutData} = useContext(WorkoutContext);
  const workoutParams = route.params;

  const [inputs, setInputs] = useState([0, 1, 2]); //for later dynamic inputs

  const [workoutName, setWorkoutName] = useState('');
  const [exerciseData, setExerciseData] = useState([]);

  const createTwoButtonAlert = () => {
    Alert.alert(
      "Delete workout?",
      "Are you sure you want to delete this workout?",
      [
        {
          text: "No",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Yes",
          onPress: () => handleDataDelete(),
        }
      ],
      {
        cancelable: true,
      }
    );
  }

  useLayoutEffect(() => {
    if (workoutParams.screenState === 'EDIT') {
      setWorkoutName(workoutParams.paramData.name)
      navigation.setOptions({
        title: 'Edit Workout',
        headerRight: () => (
          <Icon
            containerStyle={{flexDirection: 'row', marginRight: 20}}
            color={'white'}
            type={'font-awesome'}
            name={'trash'}
            onPress={() => createTwoButtonAlert()}
          />
        )
      })
    }
  }, [workoutParams.screenState]);

  //LOCAL DATA UPDATE
  //getting data from child (ExerciseItem) and updating it to local variable for use inside screen
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

  const handleInputValidation = () => {

    const countRegex = /^\d{1,2}x\d{1,2}$/;
    let result = [true];

    if (workoutName == "") {
      result = [false, 'Please enter a valid workout name.'];
    }
    for ( let exerciseObj of exerciseData ) {
      if (exerciseObj.name == "") {
        result = [false, 'Please enter a valid exercise name.'];
      }
      if ( exerciseObj.weight == "" || (exerciseObj.weight % 1 !== 0) ) {
        result = [false, 'Please enter a valid weight value.'];
      }
      if ( !countRegex.test(exerciseObj.count) ) {
        result = [false, 'Please enter valid sets x reps.'];
      }
    }
    return result;
  }

  const handleDataCreate = () => {

    const validationCheck = handleInputValidation();
    if (!validationCheck[0]){
      return alert(validationCheck[1])
    }

    setWorkoutData([...workoutData, {id: workoutData.length !== 0 ? workoutData[workoutData.length - 1].id + 1 : 0, name: workoutName, data: exerciseData}]);
    navigation.navigate('Home');
  }

  const handleDataEdit = () => {

    const validationCheck = handleInputValidation();
    if (!validationCheck[0]){
      return alert(validationCheck[1])
    }

    let updatedData = workoutData.map(obj => {
      if (obj.id === workoutParams.paramData.id) {
        return {...obj, name: workoutName, data: exerciseData}
      } else {
        return obj;
      }
    })

    setWorkoutData(updatedData);
    navigation.navigate('Home');
  }

  const handleDataDelete = () => {
    let updatedData = workoutData.filter(obj => obj.id !== workoutParams.paramData.id);
    setWorkoutData(updatedData);
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Workout Name'
        onChangeText={setWorkoutName}
        value={workoutName}
        maxLength={35}
        leftIcon={() => (
          <Icon
            name={'dumbbell'}
            color={'darkslateblue'}
            type={'material-community'}
          />
        )}
      />
      <ScrollView style={styles.inputsContainer}>
        {inputs.map((value, index) => {
          return <EditableExerciseItem key={index} id={index} getData={getData} workoutParams={workoutParams} />
        })}
      </ScrollView>
      {
        workoutParams.screenState === 'EDIT' ? (
          <Button
            title="Save"
            onPress={() => {
              handleDataEdit();
            }}
            color={'darkslateblue'}
          />
        ) : (
          <Button
            title="Add"
            onPress={() => {
              handleDataCreate();
            }}
            color={'darkslateblue'}
          />
        )
      }
    </View>
  );
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

export default ConfigureWorkoutScreen;
