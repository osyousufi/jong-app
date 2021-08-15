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
  Divider,
  Icon,
} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrackerScreen = ({navigation, route}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.paramData.name}`,
    });
  }, []);

  const extractCountData = () => {
    let count = route.params.paramData.count;
    let middleIdx = count.indexOf('x');
    let extractedSets = count.slice(0, middleIdx);
    let extractedReps = count.slice(middleIdx + 1, count.length);

    return [extractedSets, extractedReps];
  }

  const [finalTrackerData, setFinalTrackerData] = useState({});
  const [data, setData] = useState(
    route.params.paramData.trackerData ? route.params.paramData.trackerData : []
  );
  const [exerciseWeight, setExerciseWeight] = useState( parseInt(route.params.paramData.weight) );
  // const [exerciseSets, setExerciseSets] = useState(extractCountData()[0]);
  const [exerciseReps, setExerciseReps] = useState( parseInt(extractCountData()[1]) );

  // useEffect(() => {
  //   let newData = Object.create(route.params.paramData);
  //   newData.trackerData = data;
  //   setFinalTrackerData(newData);
  // }, [data]);

  // const saveData = () => {
  //
  // }


  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Your count & weight: {route.params.paramData.count} {route.params.paramData.weight}lbs</Text>
      <View style={{marginTop: 20}}>
        <Text>Weight (lbs):</Text>
        <Divider orientation="horizontal" />
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
          <View>
            <Button
              title="-"
              onPress={() => {
                setExerciseWeight( exerciseWeight - 5 );
              }}
            />
          </View>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <Input
              keyboardType={"decimal-pad"}
              placeholder='50'
              onChangeText={setExerciseWeight}
              value={exerciseWeight.toString()}
              maxLength={5}
              containerStyle={{width: 100}}
              style={{textAlign: 'center'}}
            />
          </View>
          <View>
            <Button
              title="+"
              onPress={() => {
                setExerciseWeight( exerciseWeight + 5 );
              }}
            />
          </View>
        </View>
      </View>

      <View>
        <Text>Reps:</Text>
        <Divider orientation="horizontal" />
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
          <View>
            <Button
              title="-"
              onPress={() => {
                setExerciseReps( exerciseReps - 1 );
              }}
            />
          </View>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <Input
              keyboardType={"decimal-pad"}
              placeholder='5'
              onChangeText={setExerciseReps}
              value={exerciseReps.toString()}
              maxLength={5}
              containerStyle={{width: 100}}
              style={{textAlign: 'center'}}
            />
          </View>
          <View>
            <Button
              title="+"
              onPress={() => {
                setExerciseReps( exerciseReps + 1 );
              }}
            />
          </View>
        </View>
      </View>

      <ScrollView>
        {
          data.map((obj, idx) => {
            return <Text key={idx}>{obj.id} -- {obj.weight} {obj.reps}</Text>
          })
        }
      </ScrollView>

      <Button
        title={'add set'}
        onPress={() => {
          setData([
            ...data, {id: data.length !== 0 ? data[data.length - 1].id + 1 : 0, weight: exerciseWeight, reps: exerciseReps}
          ]);
        }}
      />

      <Button
        title={'save'}
        onPress={() => {
          navigation.navigate('LoadWorkout', {calendarData: {dateString: route.params?.date}, trackerPayload: {id: route.params?.paramData.id, data: data}} );
        }}
      />


    </View>
  )
}

// <Button
//   title={'save'}
//   onPress={() => {
//     // console.log(finalTrackerData)
//     navigation.navigate('LoadWorkout', {trackerData: finalTrackerData} );
//   }}
// />

// <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
//   <View style={{marginRight: 10, marginTop: 10}}>
//     <Button title="-"/>
//   </View>
//   <View style={{flex: 1}}>
//     <Input
//       placeholder='50'
//       onChangeText={setExerciseWeight}
//       value={exerciseWeight}
//       maxLength={5}
//     />
//   </View>
//   <View style={{marginRight: 10, marginTop: 10}}>
//     <Button title="+"/>
//   </View>
// </View>

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
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

export default TrackerScreen;
