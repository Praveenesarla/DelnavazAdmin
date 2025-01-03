/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {horizontalScale, moderateScale, verticalScale} from '../../utils/scale';
import {colors, fontsFamily} from '../../constants/fonts';
import AppButton from '../../components/AppButton';
import {getProfile} from '../../api/auth';
import {getItem, getToken} from '../../api/localstorage';

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    getDetails();
    tokencheck();
  }, []);

  const getDetails = async () => {
    try {
      const response = await getProfile();
      console.log('ress', response.data.data);
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  const tokencheck = async () => {
    const repsonse = await getToken();

    console.log('token', repsonse);
  };

  return (
    <View style={styles.mainContainer}>
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
      <Text style={styles.mainText}>Your Recordings</Text>
      <View style={styles.buttonContainer}>
        <AppButton
          text="Go Live"
          backgroundColor={colors.red}
          onPress={() => {
            navigation.navigate('Live');
          }}
          textColor={colors.white}
        />
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text
            style={{
              fontFamily: fontsFamily.Regular,
              color: colors.lightBrown,
              fontSize: moderateScale(14),
            }}>
            or
          </Text>
          <View style={styles.line} />
        </View>

        <AppButton
          onPress={() => {
            navigation.navigate('recordingDetails');
          }}
          text="Start Recording"
          borderWidth={1}
          textColor={colors.red}
          borderColor={colors.red}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: horizontalScale(15),
  },
  logoIcon: {
    width: horizontalScale(48),
    height: verticalScale(50),
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(30),
  },
  mainText: {
    fontFamily: fontsFamily.Bold,
    color: colors.darkBrown,
    fontSize: moderateScale(24),
    marginTop: verticalScale(15),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  line: {
    width: horizontalScale(150),
    // height: 1,
    borderWidth: 1,
    borderColor: colors.placeholder,
  },
  orContainer: {flexDirection: 'row', alignItems: 'center', gap: 7},
});
