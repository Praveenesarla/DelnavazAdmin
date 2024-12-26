/* eslint-disable prettier/prettier */
import React, {useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AppIcon from '../../assets/splash/AppIcon';
import * as Animatable from 'react-native-animatable';
import {getItem} from '../../api/localstorage';

const SplashScreen = ({navigation}) => {
  // Create a ref for the animated view
  const iconRef = useRef(null);

  // Function to check authentication status
  const authStatusCheck = async () => {
    const isAuthenticated = await getItem('authenticate');
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigation.replace('App');
    } else {
      navigation.navigate('Auth');
    }
  };

  // Use effect to trigger the animation on component mount
  useEffect(() => {
    if (iconRef.current) {
      // Animate the icon from below the screen to the center
      iconRef.current
        .animate({
          from: {translateY: 1000}, // Start below the screen
          to: {translateY: 0}, // End at center
          duration: 1000, // Animation duration
        })
        .then(() => {
          authStatusCheck();
        });
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animatable.View ref={iconRef} style={styles.iconContainer}>
        <AppIcon />
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2E3BC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    // Additional styles for icon container if needed
  },
});
