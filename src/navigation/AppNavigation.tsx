import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RecordingDetails from '../screens/RecordingDetails';
import RecordingEndScreen from '../screens/RecordingEndScreen';
import RecordingScreen from '../screens/RecordingScreen';
import LiveScreen from '../screens/LiveScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="recordingDetails" component={RecordingDetails} />
      <Stack.Screen name="recordingEnd" component={RecordingEndScreen} />
      <Stack.Screen name="recording" component={RecordingScreen} />
      <Stack.Screen name="Live" component={LiveScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
