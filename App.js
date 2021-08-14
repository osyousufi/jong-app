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
  Icon,
} from 'react-native-elements';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { WorkoutContext } from './contexts/WorkoutContext';
import HomeScreen from './screens/HomeScreen';
import ConfigureWorkoutScreen from './screens/ConfigureWorkoutScreen';
import CalendarScreen from './screens/CalendarScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoadWorkoutScreen from './screens/LoadWorkoutScreen';
import TrackerScreen from './screens/TrackerScreen';

// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ]
// const dateObj = new Date()
// const monthNumber = dateObj.getMonth()
// const monthName = monthNames[monthNumber]


const getHeaderOptions = (route) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  const navigation = useNavigation();

  let payload = {
    name: '',
    style: {},
    icon: (
      <Icon
        containerStyle={{flexDirection: 'row', marginRight: 20}}
        color={'white'}
        type={'font-awesome'}
        name={'gear'}
        onPress={() => navigation.navigate('Settings')}
      />
    )
  }

  if (routeName === 'Home') {
    payload.name = `Jong`;
    payload.style = {fontWeight: 'bold'}

  } else if (routeName === 'Calendar') {
    payload.name = `Calendar`;
    payload.icon = (
      <View style={{flexDirection: 'row'}}>
        <Icon
          containerStyle={{marginRight: 20}}
          color={'white'}
          type={'font-awesome'}
          name={'bell'}
            onPress={() => alert('notif pressed')}
        />
        <Icon
          containerStyle={{marginRight: 20}}
          color={'white'}
          type={'font-awesome'}
          name={'gear'}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    )
  }

  return payload;

}


const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {

  return (
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="white"
    inactiveColor="grey"
    barStyle={{ backgroundColor: 'darkslateblue' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
      />
    </Tab.Navigator>
  );
}


const Stack = createStackNavigator();
//contains routes which link to different pages
const App = () => {

  const [workoutData, setWorkoutData] = useState([
  ]);


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <WorkoutContext.Provider value={{workoutData, setWorkoutData}}>
          <Stack.Navigator
            initialRouteName="HomeTabs"
            screenOptions={({navigation}) => ({
              headerStyle: {
                backgroundColor: 'darkslateblue',
              },
              headerTintColor: 'white',

            })}
          >
              <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={({ route }) => ({
                  title: getHeaderOptions(route).name,
                  headerTitleStyle: getHeaderOptions(route).style,
                  headerRight: () => getHeaderOptions(route).icon,
                })}
              />
              <Stack.Screen
                name="ConfigureWorkout"
                component={ConfigureWorkoutScreen}
                options={{ title: 'New Workout' }}
                initialParams={{ screenState: 'CREATE' }}
              />
              <Stack.Screen
                name="LoadWorkout"
                component={LoadWorkoutScreen}
                options={{
                  title: 'Date here',
                  // headerRight: () => null
                }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  title: 'Settings',
                  // headerRight: () => null
                }}
              />
              <Stack.Screen
                name="Tracker"
                component={TrackerScreen}
                options={{
                  title: 'Untitled Exercise',
                  // headerRight: () => null
                }}
              />
          </Stack.Navigator>

        </WorkoutContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>

  )
}


export default App;
