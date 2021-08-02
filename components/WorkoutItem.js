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

import { useNavigation } from '@react-navigation/native';

const WorkoutItem = ({workout}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ConfigureWorkout', {paramData: workout, screenState: 'EDIT'});
      }}
      style={{marginBottom: 50}}
    >
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
            );
          })
        }
      </Card>
    </TouchableOpacity>
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

export default WorkoutItem;
