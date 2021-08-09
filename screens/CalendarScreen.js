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

import database from '@react-native-firebase/database';


//on press, send to dynamic page that shows exercises from workout data that you choose for that day;
//the workouts can be marked as complete and are stored in a local db (async storage?);
//

let dbMarkedDates;
database().ref('CALENDAR_DATA').once('value')
.then(snapshot => {
  dbMarkedDates = snapshot.val();
});

let dbExerciseData;
database().ref('EXERCISE_DATA').once('value')
.then(snapshot => {
  dbExerciseData = snapshot.val();
  // console.log(JSON.stringify(dbExerciseData))
});

const CalendarScreen = ({route, navigation}) => {


  const [localMarkedDates, setLocalMarkedDates] = useState(dbMarkedDates);
  const [localExerciseData, setLocalExerciseData] = useState(dbExerciseData);

  // useEffect(() => {
  //
  //     let exerciseData = dbExerciseData;
  //
  //     // if (exerciseData !== null) {
  //     //
  //     // }
  //     // let exerciseObj = exerciseData.find(obj => obj.date === route.params?.exerciseData.date);
  //     // let exerciseObjIdx = exerciseData.indexOf(exerciseObj);
  //     //
  //     // if (exerciseObj !== undefined) {   //if exercise obj exists:
  //     //   exerciseData[exerciseObjIdx] = route.params?.exerciseData;
  //     // } else { //else it doesnt exist so add it to data
  //     //   exerciseData.push(route.params?.exerciseData);
  //     // }
  //     //
  //
  //     // database().ref('EXERCISE_DATA').set({[route.params?.date]: route.params?.exerciseData})
  //     // .then(() => {
  //     //   console.log('data set')
  //     // });
  //
  //     // console.log(route.params?.exerciseData)
  //
  // }, [route.params?.exerciseData]);

  //store local marked dates data (state)
  useEffect(() => {

    route.params?.date !== undefined ? setLocalMarkedDates({
      ...localMarkedDates,
      [route.params?.date]: {marked: true}
    }) : null

  }, [route.params?.date]);

  //store local exercise data (state)
  useEffect(() => {
    route.params?.exerciseData !== undefined ? setLocalExerciseData({
      ...localExerciseData,
      [route.params?.date]: route.params?.exerciseData
    }) : null
  }, [route.params?.exerciseData]);

  //store persistant marked dates data (firebase)
  useEffect(() => {

    if (localMarkedDates !== undefined) {
      database().ref('CALENDAR_DATA').set(localMarkedDates)
      .then(() => {
        console.log('data set')
      });
    }
  }, [localMarkedDates]);

  //store persistant exercise data (firebase)
  useEffect(() => {

    if (localExerciseData !== undefined) {
      database().ref('EXERCISE_DATA').set(localExerciseData)
      .then(() => {
        console.log('data set')
      });
    }

  }, [localExerciseData]);


  // //store local exercise data (state) notes: update if existing
  // useEffect(() => {
  //
  //   route.params?.exerciseData !== undefined ? setLocalExerciseData([
  //     ...localExerciseData,
  //     route.params
  //   ]) : null
  //
  // }, [route.params?.exerciseData]);
  //
  //
  // //store persistant exercise data (firebase)
  // useEffect(() => {
  //
  //   // database().ref('CALENDAR_DATA').set(localMarkedDates)
  //   // .then(() => {
  //   //   console.log('data set')
  //   // });
  //   //
  //   // database().ref('CALENDAR_DATA').once('value')
  //   // .then(snapshot => {
  //   //   console.log('curr calendar data:', snapshot.val());
  //   // });
  //
  //   console.log(localExerciseData)
  // }, [localExerciseData]);


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
            navigation.navigate('LoadWorkout', {calendarData: day, screenState: 'NEW'});
            // console.log(day);
          }}
          theme={{
            calendarBackground: '#f2f2f2',
            dayTextColor: 'darkslateblue',
            textDisabledColor: 'grey',
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
