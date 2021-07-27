import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import {
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
import ConfigureWorkoutScreen from './screens/ConfigureWorkoutScreen';


const Stack = createStackNavigator();

//contains routes which link to different pages
const App = () => {

  const [workoutData, setWorkoutData] = useState([
    {
      id: 0,
      name: "Workout A",
      data:[{"id":0,"name":"Squats","weight":"60","count":"5x4"},{"id":1,"name":"Benchpress","weight":"85","count":"10x4"},{"id":2,"name":"Curls","weight":"35","count":"10x4"}]
    }
  ]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <WorkoutContext.Provider value={{workoutData, setWorkoutData}}>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="ConfigureWorkout"
                component={ConfigureWorkoutScreen}
                options={{ title: 'Configure Workout' }}
                initialParams={{ screenState: 'CREATE' }}
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
