import React, {useState, useContext, useEffect, useLayoutEffect, Fragment} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Text,
  Header,
  Input,
  Button,
  Card,
  Icon,
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const InteractableExerciseItem = ({data, date}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Tracker', {date: date, paramData: data});
        console.log(data)
      }}
    >
      <Card>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Card.Title style={{textAlign: 'left'}}>
              {data.name}
            </Card.Title>
          </View>
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'right', textDecorationLine: 'underline'}}>
              {`${data.count}`}
            </Text>
          </View>





        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default InteractableExerciseItem;
