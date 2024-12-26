/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Pressable } from 'react-native';
import Svg, {Rect, Path} from 'react-native-svg';
const StopRecording = props => (
  
  <Svg
    width={80}
    height={80}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={80} height={80} rx={40} fill="white" />
    <Path
      d="M26.667 40C26.667 33.7146 26.667 30.5719 28.6196 28.6193C30.5722 26.6667 33.7149 26.6667 40.0003 26.6667C46.2857 26.6667 49.4284 26.6667 51.381 28.6193C53.3337 30.5719 53.3337 33.7146 53.3337 40C53.3337 46.2854 53.3337 49.4281 51.381 51.3807C49.4284 53.3333 46.2857 53.3333 40.0003 53.3333C33.7149 53.3333 30.5722 53.3333 28.6196 51.3807C26.667 49.4281 26.667 46.2854 26.667 40Z"
      fill="#FF0642"
    />
  </Svg>
 
);
export default StopRecording;
