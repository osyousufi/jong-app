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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CalendarScreen = ({route, navigation}) => {

  const [localMarkedDates, setLocalMarkedDates] = useState({});
  const [localExerciseData, setLocalExerciseData] = useState({});

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  }

  const getMarkedDatesData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        setLocalMarkedDates(JSON.parse(jsonValue));
      }
    } catch(e) {
      console.log(e);
    }
  }

  const getExerciseData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        setLocalExerciseData(JSON.parse(jsonValue));
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getMarkedDatesData('MARKED_DATES');
    getExerciseData('CALENDAR_DATA');

  }, []);


  //store local exercise + marked dates data (state)
  useEffect(() => {

    if (route.params?.exerciseData.length !== 0) {

      route.params?.date !== undefined ? setLocalMarkedDates({
        ...localMarkedDates,
        [route.params?.date]: {marked: true}
      }) : null;

      route.params?.exerciseData !== undefined ? setLocalExerciseData({
        ...localExerciseData,
        [route.params?.date]: {workoutName: route.params?.workoutName, exerciseData: route.params?.exerciseData}
      }) : null;

    }

  }, [route.params?.exerciseData]);

  //store persistant marked dates data
  useEffect(() => {
    storeData('MARKED_DATES', localMarkedDates);
  }, [localMarkedDates]);

  //store persistant exercise data (main)
  useEffect(() => {
    storeData('CALENDAR_DATA', localExerciseData);
  }, [localExerciseData])


  return (
    <View>
      <Calendar
          // Enable horizontal scrolling, default = false
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
          // Set custom calendarWidth.
          // calendarWidth={400}
          // onDayPress={(day) => {console.log('selected day', day)}}
          onDayPress={(day) => {
            if (Object.keys(localMarkedDates).includes(day.dateString)) {
              navigation.navigate('LoadWorkout', {calendarData: day, workoutName: localExerciseData.[day.dateString].workoutName, exercisePayload: localExerciseData.[day.dateString].exerciseData, screenState: 'EDIT'});
            } else {
              navigation.navigate('LoadWorkout', {calendarData: day, screenState: 'NEW'});
            }
          }}
          theme={{
            calendarBackground: '#f2f2f2',
            // dayTextColor: 'darkslateblue',
            textDisabledColor: 'grey',
            dotColor: 'darkslateblue',
            todayTextColor: 'darkviolet',
            arrowColor: 'darkslateblue',
          }}
          markedDates={localMarkedDates}
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

export default CalendarScreen;
