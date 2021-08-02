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

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { WorkoutContext } from './contexts/WorkoutContext';
import HomeScreen from './screens/HomeScreen';
import ConfigureWorkoutScreen from './screens/ConfigureWorkoutScreen';
import CalendarScreen from './screens/CalendarScreen';
import SettingsScreen from './screens/SettingsScreen';

// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ]
// const dateObj = new Date()
// const monthNumber = dateObj.getMonth()
// const monthName = monthNames[monthNumber]

const getHeaderTitle = (route) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'Jong';
    case 'Calendar':
      return `Calendar`;
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

// const getHeaderRightIcon = (route) => {
//
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
//
//   switch (routeName) {
//     case 'Home':
//       return (
//         <Icon
//           containerStyle={{flexDirection: 'row', marginRight: 20}}
//           color={'white'}
//           type={'font-awesome'}
//           name={'gear'}
//             onPress={() => alert('Settings pressed')}
//         />
//       )
//       case 'Calendar':
//         return (
//           <View style={{flexDirection: 'row'}}>
//             <Icon
//               containerStyle={{marginRight: 20}}
//               color={'white'}
//               type={'font-awesome'}
//               name={'bell'}
//                 onPress={() => alert('notif pressed')}
//             />
//             <Icon
//               containerStyle={{marginRight: 20}}
//               color={'white'}
//               type={'font-awesome'}
//               name={'gear'}
//                 onPress={() => alert('Settings pressed')}
//             />
//           </View>
//         )
//   }
// }


const Tab = createBottomTabNavigator();

const HomeTabs = () => {

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          marginTop: 10
        }
      }}
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
            screenOptions={({navigation}) => ({
              headerStyle: {
                backgroundColor: 'darkslateblue',
              },
              headerTintColor: 'white',
              headerRight: () => (
                <Icon
                  containerStyle={{flexDirection: 'row', marginRight: 20}}
                  color={'white'}
                  type={'font-awesome'}
                  name={'gear'}
                  onPress={() => navigation.navigate('Settings')}
                />
              ),
            })}
          >
              <Stack.Screen
                name="Home"
                component={HomeTabs}
                options={({ route }) => ({
                  title: getHeaderTitle(route),
                  headerTitleStyle: getHeaderTitleStyle(route),
                })}
              />
              <Stack.Screen
                name="ConfigureWorkout"
                component={ConfigureWorkoutScreen}
                options={{ title: 'New Workout' }}
                initialParams={{ screenState: 'CREATE' }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  title: 'Settings',
                  headerRight: () => null
                }}
              />
          </Stack.Navigator>
        </WorkoutContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>

  )
}


export default App;
