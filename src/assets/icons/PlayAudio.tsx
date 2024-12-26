/* eslint-disable prettier/prettier */
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const PlayAudio = props => (
  <Svg
    width={34}
    height={34}
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.9997 33.6667C26.2044 33.6667 33.6663 26.2047 33.6663 17C33.6663 7.79525 26.2044 0.333332 16.9997 0.333332C7.79493 0.333332 0.333008 7.79525 0.333008 17C0.333008 26.2047 7.79493 33.6667 16.9997 33.6667ZM14.8222 23.4097L22.6891 18.7649C23.9921 17.9957 23.9921 16.0043 22.6891 15.2351L14.8222 10.5903C13.5559 9.84268 11.9997 10.8158 11.9997 12.3553V21.6447C11.9997 23.1842 13.5559 24.1573 14.8222 23.4097Z"
      fill="#463730"
    />
  </Svg>
);
export default PlayAudio;
