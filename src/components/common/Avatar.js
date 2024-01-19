import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

const Avatar = ({
  touchable = false,
  onPress = () => {},
  source,
  size = 50,
  borderWidth = 2,
  borderColor = '#FFFFFF',
  backgroundColor = '#FFFFFF',
  style,
  ...props
}) => {
  const imgProps = {
    source: source,
    defaultSource: {}, //require('../../assets/images/blank_avatar.png'),
    resizeMode: 'cover',
    style: [
      {
        width: size,
        height: size,
        borderRadius: size,
        borderWidth: borderWidth,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      },
      style,
    ],
    ...props,
  };
  if (touchable) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Image {...imgProps} />
      </TouchableOpacity>
    );
  }
  return <Image {...imgProps} />;
};

export default Avatar;
