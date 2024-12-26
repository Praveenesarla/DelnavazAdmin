/* eslint-disable prettier/prettier */
import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const Notification = props => (
  <Svg
    width={44}
    height={44}
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={44} height={44} rx={22} fill="white" />
    <Path
      d="M28.7491 19.7096V19.005C28.7491 15.1362 25.7274 12 22 12C18.2726 12 15.2509 15.1362 15.2509 19.005V19.7096C15.2509 20.5552 15.0097 21.3818 14.5578 22.0854L13.4504 23.8095C12.4388 25.3843 13.211 27.5249 14.9704 28.0229C19.5727 29.3257 24.4273 29.3257 29.0296 28.0229C30.789 27.5249 31.5612 25.3843 30.5496 23.8095L29.4422 22.0854C28.9903 21.3818 28.7491 20.5552 28.7491 19.7096Z"
      stroke="#463730"
      strokeWidth={1.5}
    />
    <Path
      d="M17.5 29C18.155 30.7478 19.9225 32 22 32C24.0775 32 25.845 30.7478 26.5 29"
      stroke="#463730"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
export default Notification;
