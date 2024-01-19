import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
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

  const greeting =
    i18n.language === 'th'
      ? `${t('hello')}! ${t('khun')}${profile.firstNameTH}`
      : `${t('hello')}! ${t(getTitleFromSex(profile.sex, true))}${
          profile.firstNameEN
        }`;

  const onAvatarPress = () => {
    navigation.navigate('SettingMenu');
  };

  return (
    <View style={styles.container}>
      <Avatar
        style={{alignSelf: 'flex-end'}}
        source={{
          uri: profile.profilePicture,
        }}
        touchable
        onPress={onAvatarPress}
      />
      <Text style={styles.textGreeting}>{greeting}</Text>
      <Text style={styles.textEncourage}>{t('encourage')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    backgroundColor: appColors.primaryColor,
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
