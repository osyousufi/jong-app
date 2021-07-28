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
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { WorkoutContext } from './contexts/WorkoutContext';
import HomeScreen from './screens/HomeScreen';
import ConfigureWorkoutScreen from './screens/ConfigureWorkoutScreen';
import CalendarScreen from './screens/CalendarScreen';

const getHeaderTitle = (route) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'Jong (Home)';
    case 'Calendar':
      return 'Calendar (Month)';
  }
}

const getHeaderTitleStyle = (route) => {

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return {
        fontWeight: 'bold',
      }
  }

}

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
}


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
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: 'darkslateblue',
              },
              headerTintColor: 'white',
            }}
          >
              <Stack.Screen
                name="Home"
                component={HomeTabs}
                options={({ route }) => ({
                  headerTitle: getHeaderTitle(route),
                  headerTitleStyle: getHeaderTitleStyle(route),
                })}
              />
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

// <Tab.Screen
//   name="ConfigureWorkout"
//   component={ConfigureWorkoutScreen}
//   options={{ title: 'Configure Workout' }}
//   initialParams={{ screenState: 'CREATE' }}
// />

// <Header
//   leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
//   centerComponent={{ text: 'Jong App', style: { color: '#fff' } }}
//   rightComponent={{ icon: 'home', color: '#fff' }}
//   />

export default App;
