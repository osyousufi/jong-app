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

const SetListItem = ({data, handleSetDelete, handleSetEdit, idx}) => {
  return (
    <View style={{marginTop: 20}}>
      <ListItem.Swipeable
        rightContent={
          <Button
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
            onPress={() => handleSetDelete(data.id)}
          />
        }
        leftContent={
          <Button
            icon={{ name: 'edit', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'blue' }}
            onPress={() => handleSetEdit(data.id)}
          />
        }
      >
        <ListItem.Content>
          <Text>
            <Text style={{fontWeight: 'bold'}}> {idx + 1}         </Text>
            <Text style={{fontWeight: 'bold'}}>          {data.weight}</Text>
            <Text> lbs</Text>
            <Text style={{fontWeight: 'bold'}}>                    {data.reps}</Text>
            <Text> reps</Text>
          </Text>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
    </View>
  )
}

export default SetListItem;
