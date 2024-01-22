import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {appColors} from '../../const';
import Dot from '../../components/common/Dot';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthReducer, setIsLogin} from '../../redux/slices/authSlice';

// ขอไม่ใช้ lib pincode เพราะไม่อยากลง lib เยอะครับ

const PinLock = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {savedPin} = useSelector(selectAuthReducer);
  const [pin, setPin] = useState('');
  const [instructionText, setInstructionText] = useState(' ');

  const dotSize = 18;
  const pinCount = 6;
  const dotActiveColor = '#777777';
  const dotInactiveColor = '#DADADA';

  const renderDots = () => {
    const _dot = Array.from(Array(pinCount));
    return _dot.map((item, index) => (
      <Dot
        key={index}
        color={pin.length > index ? dotActiveColor : dotInactiveColor}
        size={dotSize}
      />
    ));
  };

  useEffect(() => {
    if (pin.length === pinCount) {
      if (pin === savedPin) {
        dispatch(setIsLogin(true));
      } else {
        setInstructionText(t('pin_wrong'));
        setPin('');
      }
    }
  }, [pin]);

  const onPinPress = char => {
    if (pin.length < pinCount) {
      setPin(val => (val += char));
    }
  };

  const onDeletePress = () => {
    setPin(val => val.slice(0, -1));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={appColors.primaryLightColor}
        animated
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.topText}>{t('pin_login')}</Text>
        </View>
        <View style={styles.dotsContainer}>{renderDots()}</View>
        <View style={styles.topContainer}>
          <Text style={styles.instructText}>{instructionText}</Text>
        </View>
        <View style={styles.pinButtonContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => onPinPress(1)}
              style={styles.pinButton}>
              <Text style={styles.pinButtonText}>{'1'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPinPress(2)}
              style={styles.pinButton}>
              <Text style={styles.pinButtonText}>{'2'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPinPress(3)}
              style={styles.pinButton}>
              <Text style={styles.pinButtonText}>{'3'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => onPinPress(4)}
              style={styles.pinButton}>
              <Text style={styles.pinButtonText}>{'4'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPinPress(5)}
              style={styles.pinButton}>
              <Text style={styles.pinButtonText}>{'5'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPinPress(6)}
              style={styles.pinButton}>
              <Text style={styles.pinButtonText}>{'6'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => onPinPress(7)}
              style={styles.pinButton}>
              <Text style={styles.pinButtonText}>{'7'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPinPress(8)}
              style={styles.pinButton}>
              <Text style={styles.pinButtonText}>{'8'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPinPress(9)}
              style={styles.pinButton}>
              <Text style={styles.pinButtonText}>{'9'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[styles.pinButton, {backgroundColor: 'transparent'}]}
            />
            <TouchableOpacity
              onPress={() => onPinPress(0)}
              style={styles.pinButton}>
              <Text style={styles.pinButtonText}>{'0'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDeletePress()}
              style={styles.pinButton}>
              <Text style={styles.pinButtonText}>{'Del'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: appColors.primaryLightColor,
  },
  container: {
    flex: 1,
    padding: 24,
    rowGap: 24,
  },
  topContainer: {
    alignItems: 'center',
  },
  topText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  instructText: {
    fontSize: 14,
    color: 'white',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24,
    columnGap: 8,
  },
  pinButtonContainer: {
    rowGap: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 32,
  },
  pinButton: {
    backgroundColor: '#DADADA',
    width: 72,
    height: 72,
    borderRadius: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinButtonText: {
    fontSize: 24,
    fontWeight: '500',
  },
});

export default PinLock;
