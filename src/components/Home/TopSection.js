import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {appColors} from '../../const';
import Avatar from '../common/Avatar';
import {useTranslation} from 'react-i18next';
import {selectUserProfileReducer} from '../../redux/slices/userProfileSlice';
import {getTitleFromSex} from '../../utils/util';
import {useNavigation} from '@react-navigation/native';

const TopSection = props => {
  const {t, i18n} = useTranslation();
  const {profile} = useSelector(selectUserProfileReducer);
  const navigation = useNavigation();
  const isThai = i18n.language === 'th';

  const morningGreeting = isThai
    ? `${t('goodmorning')} ${t('khun')}${profile.firstNameTH}`
    : `${t('goodmorning')} ${t(getTitleFromSex(profile.sex, true))}${
        profile.firstNameEN
      }`;

  const afternoonGreeting = isThai
    ? `${t('goodafternoon')} ${t('khun')}${profile.firstNameTH}`
    : `${t('goodafternoon')} ${t(getTitleFromSex(profile.sex, true))}${
        profile.firstNameEN
      }`;

  const eveningGreeting = isThai
    ? `${t('goodevening')} ${t('khun')}${profile.firstNameTH}`
    : `${t('goodevening')} ${t(getTitleFromSex(profile.sex, true))}${
        profile.firstNameEN
      }`;

  const nightGreeting = isThai
    ? `${t('goodnight')} ${t('khun')}${profile.firstNameTH}`
    : `${t('goodnight')} ${t(getTitleFromSex(profile.sex, true))}${
        profile.firstNameEN
      }`;

  const onAvatarPress = () => {
    navigation.navigate('SettingMenu');
  };

  const {morning, evening, night, afternoon} = {
    morning: {
      bg: require('../../assets/img/morning.jpeg'),
      img: require('../../assets/img/morning.png'),
      greeting: morningGreeting,
      encourage: t('morning_encourage'),
    },
    afternoon: {
      bg: require('../../assets/img/afternoon.jpeg'),
      img: require('../../assets/img/afternoon.png'),
      greeting: afternoonGreeting,
      encourage: t('afternoon_encourage'),
    },
    evening: {
      bg: require('../../assets/img/evening.jpeg'),
      img: require('../../assets/img/evening.png'),
      greeting: eveningGreeting,
      encourage: t('evening_encourage'),
    },
    night: {
      bg: require('../../assets/img/night.jpeg'),
      img: require('../../assets/img/night.png'),
      greeting: nightGreeting,
      encourage: t('night_encourage'),
    },
  };

  const now = new Date();
  const hour = now.getHours();

  const morHour = 5;
  const aftHour = 12;
  const eveHour = 18;
  const nigHour = 22;

  const greeting =
    hour >= morHour && hour < aftHour
      ? morning
      : hour >= aftHour && hour < eveHour
      ? afternoon
      : hour >= eveHour && hour < nigHour
      ? evening
      : night;

  return (
    <ImageBackground
      style={styles.container}
      imageStyle={styles.imageStyle}
      source={greeting.bg}>
      <Avatar
        style={{alignSelf: 'flex-end'}}
        source={{
          uri: profile.profilePicture,
        }}
        touchable
        onPress={onAvatarPress}
        size={64}
      />
      <Text style={styles.textGreeting}>{greeting.greeting}</Text>
      <Text style={styles.textEncourage}>{greeting.encourage}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 12 + 52 : 12,
    paddingBottom: 32,
    backgroundColor: appColors.primaryColor,
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
  },
  imageStyle: {
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
  },
  textLang: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'flex-end',
    textAlign: 'center',
  },
  textGreeting: {
    color: 'white',
    fontSize: 24,
  },
  textEncourage: {
    color: 'white',
    fontSize: 18,
  },
});

export default TopSection;
