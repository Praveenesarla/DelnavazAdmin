/* eslint-disable prettier/prettier */
import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const PauseRecording = props => (
  <Svg
    width={60}
    height={60}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={60} height={60} rx={30} fill="white" />
    <Rect
      x={0.5}
      y={0.5}
      width={59}
      height={59}
      rx={29.5}
      stroke="black"
      strokeOpacity={0.1}
    />
    <Path
      d="M20 24C20 22.1144 20 21.1716 20.5858 20.5858C21.1716 20 22.1144 20 24 20C25.8856 20 26.8284 20 27.4142 20.5858C28 21.1716 28 22.1144 28 24V36C28 37.8856 28 38.8284 27.4142 39.4142C26.8284 40 25.8856 40 24 40C22.1144 40 21.1716 40 20.5858 39.4142C20 38.8284 20 37.8856 20 36V24Z"
      fill="#424242"
    />
    <Path
      d="M32 24C32 22.1144 32 21.1716 32.5858 20.5858C33.1716 20 34.1144 20 36 20C37.8856 20 38.8284 20 39.4142 20.5858C40 21.1716 40 22.1144 40 24V36C40 37.8856 40 38.8284 39.4142 39.4142C38.8284 40 37.8856 40 36 40C34.1144 40 33.1716 40 32.5858 39.4142C32 38.8284 32 37.8856 32 36V24Z"
      fill="#424242"
    />
  </Svg>
);
export default PauseRecording;
