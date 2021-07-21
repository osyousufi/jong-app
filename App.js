import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Text,
  Header,
  Input,
  Button,
} from 'react-native-elements';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { WorkoutContext } from './contexts/WorkoutContext';
import HomeScreen from './screens/HomeScreen';
import ConfigureWorkoutsScreen from './screens/ConfigureWorkoutsScreen';


const Stack = createStackNavigator();

//contains routes which link to different pages
const App = () => {

  const [workoutData, setWorkoutData] = useState([]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <WorkoutContext.Provider value={{workoutData, setWorkoutData}}>

          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="ConfigureWorkouts"
                component={ConfigureWorkoutsScreen}
                options={{ title: 'Configure Workouts' }}
              />
          </Stack.Navigator>

        </WorkoutContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>

  )
}

// <Header
//   leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
//   centerComponent={{ text: 'Jong App', style: { color: '#fff' } }}
//   rightComponent={{ icon: 'home', color: '#fff' }}
//   />

export default App;
