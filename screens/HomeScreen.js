import React, {useState, useContext, useEffect, useLayoutEffect, Fragment} from 'react';
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
  FAB,
  Icon,
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
    <Fragment>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>My Workouts:</Text>
        <ScrollView>
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

      </View>
      <FAB
        onPress={() => navigation.navigate('ConfigureWorkout', { screenState: 'CREATE' })}
        icon={<Icon name={'add'} color="white" />}
        style={styles.fabButton}
        size={'large'}
        color={'darkslateblue'}
      />
    </Fragment>
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
    marginBottom: 20,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  fabButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  }
});

export default HomeScreen;
