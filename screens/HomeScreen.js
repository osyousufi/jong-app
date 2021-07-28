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

import { WorkoutContext } from '../contexts/WorkoutContext';
import WorkoutItem from '../components/WorkoutItem';


//(workout screen) displays all workouts
const HomeScreen = ({navigation}) => {

  const {workoutData, setWorkoutData} = useContext(WorkoutContext);

  useEffect(() => {
    console.log(JSON.stringify(workoutData));
  }, [workoutData]);

  return(
    <ScrollView style={styles.sectionContainer}>
      <Button onPress={() => navigation.navigate('ConfigureWorkout')} title="New Workout" style={styles}/>
      <Text style={styles.sectionTitle}>My workouts:</Text>
      {
        workoutData.map((workout, idx) => {
          return (
            <WorkoutItem
            key={idx}
            workout={workout}
            />
          )
        })
      }
    </ScrollView>
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
