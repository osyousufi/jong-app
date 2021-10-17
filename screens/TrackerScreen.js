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
  ListItem,
} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import SetListItem from '../components/SetListItem';


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


  const [data, setData] = useState(
    route.params.paramData.trackerData ? route.params.paramData.trackerData : []
  );
  const [exerciseWeight, setExerciseWeight] = useState( parseInt(route.params.paramData.weight) );
  const [exerciseReps, setExerciseReps] = useState( parseInt(extractCountData()[1]) );

  useEffect(() => {
    if (exerciseReps < 0 || exerciseReps % 1 !== 0) {
      setExerciseReps(0);
    }
  }, [exerciseReps]);

  useEffect(() => {
    if (exerciseWeight < 0 || exerciseWeight % 1 !== 0) {
      setExerciseWeight(0);
    }
  }, [exerciseWeight]);

  const handleSetDelete = (id) => {
    let _data = data.filter(obj => obj.id !== id);;
    setData(_data);
  }

  const handleSetEdit = (id) => {

    let updatedData = data.map(obj => {
      if (obj.id === id) {
        return {...obj, weight: exerciseWeight, reps: exerciseReps}
      } else {
        return obj;
      }
    })

    setData(updatedData);

  }


  return (
    <View style={{flex: 1, marginTop: 35, paddingHorizontal: 20}}>
      <Text style={styles.sectionTitle}>Sets x Reps: {route.params.paramData.count}</Text>

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
              buttonStyle={{backgroundColor: 'darkslateblue'}}
            />
          </View>
          <View style={{marginLeft: 20, marginRight: 25}}>
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
              buttonStyle={{backgroundColor: 'darkslateblue'}}
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
              buttonStyle={{backgroundColor: 'darkslateblue'}}
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
              buttonStyle={{backgroundColor: 'darkslateblue'}}
            />
          </View>
        </View>
      </View>

      <ScrollView>
        {
          data.map((obj, idx) => {
            return (
              <SetListItem
                key={idx}
                data={obj}
                handleSetDelete={handleSetDelete}
                handleSetEdit={handleSetEdit}
                idx={idx}
              />
            )
          })
        }
      </ScrollView>

        <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 20}}>
          <Button
            title={'add set'}
            onPress={() => {
              setData([
                ...data, {id: uuid.v4(), weight: exerciseWeight, reps: exerciseReps}
              ]);
            }}
            containerStyle={{margin: 10}}
            buttonStyle={{backgroundColor: 'darkslateblue'}}
          />
          <Button
            title={'save'}
            onPress={() => {
              navigation.navigate('LoadWorkout', {calendarData: {dateString: route.params?.date}, trackerPayload: {id: route.params?.paramData.id, data: data}} );
            }}
            containerStyle={{margin: 10}}
            buttonStyle={{backgroundColor: 'darkslateblue'}}
          />
        </View>

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
