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
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const SettingsScreen = ({navigation}) => {

  const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }

    console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }

    console.log('Done.')
  }

  // const removeValue = async () => {
  //   try {
  //     await AsyncStorage.removeItem('CALENDAR_DATA')
  //     await AsyncStorage.removeItem('MARKED_DATES')
  //   } catch(e) {
  //     // remove error
  //   }
  //
  //   console.log('Done.')
  // }

  return (
    <View style={styles.sectionContainer}>
      <Button
        title='Get Data Keys (Dev)'
        onPress={() => {
          getAllKeys();
        }}
        containerStyle={styles.button}
        buttonStyle={{backgroundColor: 'darkslateblue'}}
      />

      <Button
        title='Clear All Data'
        onPress={() => {
          clearAll();
          RNRestart.Restart();
        }}
        containerStyle={styles.button}
        buttonStyle={{backgroundColor: 'darkslateblue'}}
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
  button: {
    margin: 20,
  }
});

export default SettingsScreen;
