import React, {useState, useContext, useEffect, useLayoutEffect, Fragment} from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';


import { WorkoutContext } from '../contexts/WorkoutContext';


const InteractableExerciseItem = ({data, getData, dropdownValue}) => {

  const [currSet, setCurrSet] = useState(0);
  const [currRep, setCurrRep] = useState(0);

  let dataStructure = {
    ...data,
    currSet: currSet,
    currRep: currRep,
  }

  useEffect(() => {
    setCurrSet(0);
    setCurrRep(0);
  }, [dropdownValue]);

  useEffect(() => {
    getData(dataStructure);
  }, [currSet, currRep]);

  return (
    <Card>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Card.Title style={{textAlign: 'left'}}>
            {data.name}
          </Card.Title>
        </View>
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'right', textDecorationLine: 'underline'}}>
            {`${data.count} ${data.weight}lb`}
          </Text>
        </View>
      </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{marginRight: 10, marginTop: 10}}>
            <Button
              title='+'
              onPress={() => {
                setCurrSet(currSet + 1);
              }}
            />
        </View>
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'center', marginTop: 20}}>
              {`Current Set: ${currSet}`}
            </Text>
          </View>
        <View style={{marginRight: 10, marginTop: 10}}>
          <Button
            title='-'
            onPress={() => {
              setCurrSet(currSet - 1);
            }}
          />
        </View>
      </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{marginRight: 10, marginTop: 10}}>
          <Button
            title='+'
            onPress={() => {
              setCurrRep(currRep + 1);
            }}
          />
        </View>
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'center', marginTop: 20}}>
              {`Current Rep: ${currRep}`}
            </Text>
          </View>
        <View style={{marginRight: 10, marginTop: 10}}>
          <Button
            title='-'
            onPress={() => {
              setCurrRep(currRep - 1);
            }}
          />
        </View>
      </View>

    </Card>
  )
}

const LoadWorkoutScreen = ({route, navigation}) => {


  const {workoutData, setWorkoutData} = useContext(WorkoutContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);



  const getStructuredDropdownData = () => {

    let _items = items;
    for (let workoutObj of workoutData) {

      let itemStructure = {
        label: '',
        value: '',
      }
      itemStructure.label = workoutObj.name;
      itemStructure.value = JSON.stringify(workoutObj.data);
      _items.push(itemStructure);
    }

    setItems(_items);
  }

  useEffect(() => {
    getStructuredDropdownData();
  }, [workoutData]);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.dateString}`,
    })
  });

  const getData = (childData) => {

    let _exerciseData = exerciseData;
    let exerciseObj = _exerciseData.find(obj => obj.id == childData.id);
    let exerciseObjIdx = _exerciseData.indexOf(exerciseObj);

    if(exerciseObj !== undefined) {
      _exerciseData[exerciseObjIdx].currSet = childData.currSet;
      _exerciseData[exerciseObjIdx].currRep = childData.currRep;

    } else {
      _exerciseData.push(childData);
    }

    setExerciseData(_exerciseData);

  }

  return (
    <Fragment>
      <View style={styles.sectionContainer}>
        <DropDownPicker
          placeholder="Select a workout"
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          items={items}
          setItems={setItems}
          onChangeValue={(v) => {
            setExerciseData(JSON.parse(v));
          }}
          zIndex={3000}
          zIndexInverse={1000}
          containerStyle={{
            width: '90%',

          }}
        />
      </View>
      <ScrollView style={{marginTop: 100, marginBottom: 100}}>
        {
          value && JSON.parse(value).map((obj, idx) => {
            return (
              <InteractableExerciseItem
                key={idx}
                data={obj}
                getData={getData}
                dropdownValue={value}
              />
            )
          })
        }
      </ScrollView>

      <Button
        title='Save'
        onPress={() => {
          console.log(exerciseData)
        }}
      />

    </Fragment>
  )
}


const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
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
});

export default LoadWorkoutScreen;
