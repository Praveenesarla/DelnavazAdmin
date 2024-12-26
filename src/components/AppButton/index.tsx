/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import {horizontalScale, moderateScale, verticalScale} from '../../utils/scale';

interface IAppButton {
  text: string;
  backgroundColor?: string;
  borderWidth?: number;
  textColor?: string;
  onPress: (event: GestureResponderEvent) => void;
  borderColor?: string;
}

const AppButton: React.FC<IAppButton> = ({
  text,
  backgroundColor = '',
  borderWidth = 0,
  textColor = 'white',
  onPress,
  borderColor = '',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor, borderWidth, borderColor}]}>
      <Text style={{color: textColor, fontSize: moderateScale(18)}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    height: verticalScale(56),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(345),
  },
});
