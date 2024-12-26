/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {s} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you have react-native-vector-icons installed
import AppIcon from '../../assets/splash/AppIcon';
import Notification from '../../assets/icons/Notification';
import AppButton from '../../components/AppButton';
import {colors} from '../../constants/fonts';
import TrackPlayer from 'react-native-track-player';
import {newPodcast} from '../../api/auth';
import AudioItem from '../../components/AudioItem';
import {removeItem} from '../../api/localstorage';

const RecordingEndScreen = ({navigation, route}) => {
  const {name, description, category, image, recording} = route.params.data;

  const [isLoading, setIsLoading] = useState(true);

  const loadMusic = async () => {
    try {
      await TrackPlayer.add({url: recording});
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading music:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendPodcast();
  }, []);

  const sendPodcast = async () => {
    const response = await newPodcast(
      name,
      description,
      category,
      image,
      recording,
    );
    console.log('resssp', response.status);
    if (response?.status === 201) {
      showAudioSavedAlert();
    }
  };

  const showAudioSavedAlert = () => {
    Alert.alert(
      'Success', // Alert Title
      'Audio Saved Successfully', // Alert Message
      [
        {
          text: 'OK', // Button Text
          onPress: () => console.log('Alert closed'), // Action on press
        },
      ],
    );
  };

  console.log('recording-end', name, description, category, image, recording);

  useEffect(() => {
    loadMusic(); // Load music when component mounts
  }, []);

  const handleSignOut = () => {
    removeItem('authenticate');
    navigation.navigate('Auth'); // Assuming there's a Login screen
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <AppIcon width={48} height={48} />
        <Notification />
      </View>
      <View style={{alignItems: 'center'}}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.darkBrown} /> // Show loading indicator while loading
        ) : (
          <AudioItem />
        )}
      </View>

      <TouchableOpacity style={styles.floatingButton} onPress={handleSignOut}>
        <Icon name="logout" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={{marginTop: 'auto', alignItems: 'center', marginBottom: 10}}>
        <AppButton
          text="Go Home"
          backgroundColor={colors.darkBrown}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};

export default RecordingEndScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: s(20),
    paddingHorizontal: 15,
  },
  playAudioText: {
    color: colors.darkBrown, // Adjust color as needed
    fontSize: s(16), // Adjust size as needed
    textAlign: 'center',
    marginVertical: 10,
    textDecorationLine: 'underline', // Optional styling for emphasis
  },
  floatingButton: {
    position: 'absolute',
    bottom: s(80), // Position above the Go Home button
    right: s(20), // Distance from the right edge
    backgroundColor: colors.darkBrown,
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Add shadow on Android
    shadowColor: '#000', // Add shadow on iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
