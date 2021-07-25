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


const WorkoutItem = ({workout}) => {

  // useEffect(() => {
  //   console.log(JSON.stringify(workout));
  // }, [])

  return (
    <Card>
      <Card.Title>{workout.name}</Card.Title>
      <Card.Divider />
      {
        workout.data.map((exerciseData, idx) => {
          return (
            <Text key={idx}>
              <Text>{exerciseData.name} - </Text>
              <Text style={{textDecorationLine: 'underline'}}>{exerciseData.count} {exerciseData.weight}</Text>
            </Text>
          )
        })
      }

    </Card>
  )
}

//(workout screen) displays all workouts
const HomeScreen = ({navigation}) => {

  const {workoutData, setWorkoutData} = useContext(WorkoutContext);

  useEffect(() => {
    console.log(JSON.stringify(workoutData));
  }, [workoutData]);

  return(
    <View style={styles.sectionContainer}>
      <Button onPress={() => navigation.navigate('ConfigureWorkouts')} title="New Workout" style={styles}/>
      <Text style={styles.sectionTitle}>My workouts:</Text>
      {
        workoutData.map((workout, idx) => {
          return <WorkoutItem key={idx} workout={workout} />
        })
      }
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

export default HomeScreen;
