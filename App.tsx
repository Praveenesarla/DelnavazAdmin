import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import RecordingScreen from './src/screens/RecordingScreen';
import AudioItem from './src/components/AudioItem';
import MainNavigation from './src/navigation/MainNavigation';
import RecordingDetails from './src/screens/RecordingDetails';
import {useSetupPlayer} from './src/hooks/useSetupPlayer';
import {PaperProvider} from 'react-native-paper';
import AuthProvider from './src/providers/AuthProvider';
import LiveScreen from './src/screens/LiveScreen';

const App = () => {
  const onLoad = () => {
    console.log('track player setup...');
  };
  useSetupPlayer({onLoad});
  return (
    <PaperProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <MainNavigation />
      </GestureHandlerRootView>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
