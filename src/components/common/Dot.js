import React from 'react';
import {View, Platform} from 'react-native';

const Dot = ({color = '#FF0000', size = 24, style, ...props}) => {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size,
          backgroundColor: color,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default Dot;
