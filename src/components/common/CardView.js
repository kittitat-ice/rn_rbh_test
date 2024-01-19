import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';

const CardView = ({style, shadow = true, ...props}) => {
  const _style = [
    styles.card,
    shadow && Platform.OS !== 'android' && styles.shadow, // shadow on android is bugged
    style,
  ];
  return (
    <View style={_style} {...props}>
      {props.children}
    </View>
  );
};

export default CardView;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },
});
