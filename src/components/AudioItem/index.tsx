/* eslint-disable prettier/prettier */
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';
import { colors, fontsFamily } from '../../constants/fonts';
import Backward from '../../assets/icons/Backward';
import Forward from '../../assets/icons/Forward';
import PauseRecording from '../../assets/icons/PauseRecording';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import PlayAudio from '../../assets/icons/PlayAudio';
import AppButton from '../AppButton';
import TrackPlayer, { useIsPlaying, useProgress } from 'react-native-track-player';
import { Slider } from 'react-native-awesome-slider';
import { configureReanimatedLogger, ReanimatedLogLevel, useSharedValue } from 'react-native-reanimated';
import { formatSecondsToMinute } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';

const AudioItem = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false); // Default to false
  const { duration, position } = useProgress();
  const progress = useSharedValue(0.7);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false);
  const { playing } = useIsPlaying();

  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });

  // Reset state when screen is focused
  useFocusEffect(
    useCallback(() => {
      setIsPlaying(false); // Reset playback state
      // Reset progress values
      if (duration > 0) {
        progress.value = position / duration;
      }
    }, [duration])
  );

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }

  const playButton = async () => {
    await TrackPlayer.play();
    setIsPlaying(true);
  };

  const pauseButton = async () => {
    await TrackPlayer.pause();
    setIsPlaying(false);
  };

  const trackElapsedTime = formatSecondsToMinute(position);
  const totalDurationTime = formatSecondsToMinute(duration);

  return (
    <View style={styles.container}>
      <Text style={styles.itemName}>Podcast Name</Text>
      <Text style={styles.date}>23 Aug 2024</Text>
      <Slider
        style={{ marginTop: 2, width: '100%' }}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        renderBubble={() => null}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async (value) => {
          await TrackPlayer.seekTo(value * duration);
        }}
        onSlidingComplete={async (value) => {
          if (!isSliding.value) {
            return;
          }
          isSliding.value = false;
          await TrackPlayer.seekTo(value * duration);
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        <Text style={styles.timeText}>{totalDurationTime}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
        <Pressable onPress={() => TrackPlayer.seekTo(position - 10)}><Backward width={30} height={30} /></Pressable>
        
        <Pressable onPress={playing ? pauseButton : playButton}>
          {playing ? <PauseRecording /> : <PlayAudio width={60} height={60} />}
        </Pressable>

        <Pressable onPress={() => TrackPlayer.seekTo(position + 10)}><Forward width={30} height={30} /></Pressable>
      </View>
    </View>
  );
};

export default AudioItem;

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(340),
    height: verticalScale(170),
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    padding: 15,
    gap: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  timeText: {
    color: 'black',
    fontSize: 16,
    opacity: 0.76,
  },
  itemName: {
    fontFamily: fontsFamily.Medium,
    color: colors.darkBrown,
    fontSize: moderateScale(16),
  },
  date: {
    color: colors.placeholder,
    fontSize: moderateScale(14),
    fontFamily: fontsFamily.Regular,
  },
});