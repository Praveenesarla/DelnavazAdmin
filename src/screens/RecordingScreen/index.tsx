/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Audio} from 'expo-av';
import {horizontalScale, verticalScale} from '../../utils/scale';
import StartRecording from '../../assets/icons/StartRecording';
import StopRecording from '../../assets/icons/StopRecording';
import LottieView from 'lottie-react-native';
import PauseRecording from '../../assets/icons/PauseRecording';
import PlayAudio from '../../assets/icons/PlayAudio';

export default function RecordingScreen({navigation, route}) {
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  const {name, description, category, image} = route.params;

  const intervalRef = useRef(null);
  const animationRef = useRef(null);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        console.error('Recording permission not granted');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recordingOptions = {
        android: {
          extension: '.mp3',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.mp3',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      };

      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(recordingOptions);
      await recordingInstance.startAsync();

      setRecording(recordingInstance);
      setIsPaused(false);
      setElapsedTime(0);

      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1000);
      }, 1000);

      animationRef.current?.play();
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = async () => {
    setShowLoader(true);

    if (!recording) return;

    try {
      clearInterval(intervalRef.current);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const {sound, status} = await recording.createNewLoadedSoundAsync();

      setRecordings(prev => [
        ...prev,
        {
          sound,
          duration: formatDuration(status.durationMillis),
          file: uri,
        },
      ]);

      navigation.navigate('recordingEnd', {
        data: {
          name,
          description,
          category,
          image,
          recording: uri,
        },
      });

      animationRef.current?.pause();
      resetRecordingState();
    } catch (err) {
      console.error('Error stopping recording:', err);
      setShowLoader(false);
    }
  };

  const pauseRecording = async () => {
    if (!recording) return;

    try {
      await recording.pauseAsync();
      clearInterval(intervalRef.current);
      setIsPaused(true);
      animationRef.current?.pause();
    } catch (err) {
      console.error('Error pausing recording:', err);
    }
  };

  const resumeRecording = async () => {
    if (!recording) return;

    try {
      await recording.startAsync();
      setIsPaused(false);

      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1000);
      }, 1000);

      animationRef.current?.play();
    } catch (err) {
      console.error('Error resuming recording:', err);
    }
  };

  const resetRecordingState = () => {
    setRecording(null);
    setElapsedTime(0);
    setShowLoader(false);
  };

  const formatDuration = milliseconds => {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  const formatElapsedTime = () => {
    const minutes = Math.floor(elapsedTime / 1000 / 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  return (
    <>
      {showLoader ? (
        <View style={styles.loaderContainer}>
          <LottieView
            source={require('../../assets/icons/loader.json')}
            autoPlay
            loop
            style={StyleSheet.absoluteFill}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo-sm.png')}
              style={styles.logoIcon}
            />
            <Image
              source={require('../../assets/notification.png')}
              style={styles.logoIcon}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.elapsedTime}>{formatElapsedTime()}</Text>
          </View>
          {recording && (
            <View style={StyleSheet.absoluteFill}>
              <LottieView
                ref={animationRef}
                source={require('../../assets/icons/loader2.json')}
                autoPlay={false}
                loop
              />
            </View>
          )}
          <View style={styles.controls}>
            {recording ? (
              <>
                <TouchableOpacity onPress={stopRecording}>
                  <StopRecording />
                </TouchableOpacity>
                {isPaused ? (
                  <TouchableOpacity
                    onPress={resumeRecording}
                    style={styles.controlButton}>
                    <PlayAudio width={60} height={60} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={pauseRecording}
                    style={styles.controlButton}>
                    <PauseRecording />
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <TouchableOpacity onPress={startRecording}>
                <StartRecording />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    paddingBottom: 18,
  },
  loaderContainer: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(30),
  },
  logoIcon: {
    width: horizontalScale(50),
    height: verticalScale(50),
  },
  elapsedTime: {
    fontFamily: 'Inter-Bold',
    fontSize: 80,
  },
  lottieContainer: {
    width: '100%',
    height: 200,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    marginLeft: 15,
  },
});
