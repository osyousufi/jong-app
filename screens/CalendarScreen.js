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

//on press, send to dynamic page that shows exercises from workout data that you choose for that day;
//the workouts can be marked as complete and are stored in a local db (async storage?);
//
const CalendarScreen = ({navigation}) => {


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
          navigation.navigate('LoadWorkout', day);
          // console.log(day);
        }}
        theme={{
          calendarBackground: '#f2f2f2',
          dayTextColor: 'darkslateblue',
          textDisabledColor: 'grey',
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

export default CalendarScreen;
