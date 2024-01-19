import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {appColors} from '../../const';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Avatar from '../../components/common/Avatar';
import {selectUserProfileReducer} from '../../redux/slices/userProfileSlice';
import {getTitleFromSex} from '../../utils/util';

const SettingMenu = props => {
  const {t, i18n} = useTranslation();
  const {profile} = useSelector(selectUserProfileReducer);

  const name =
    i18n.language === 'th'
      ? `${t('khun')}${profile.firstNameTH}`
      : `${t(getTitleFromSex(profile.sex, true))}${profile.firstNameEN}`;

  const onLangPress = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'th' : 'en');
  };

  const onPinResetPress = () => {
    props.navigation.navigate('PinResetLock');
  };

  const settingMenuList = [
    {
      id: 'lang',
      text: t('switch_language'),
      onPress: onLangPress,
      icon: (
        <View
          style={{
            backgroundColor: 'tomato',
            width: 24,
            height: 24,
            borderRadius: 8,
          }}
        />
      ),
    },
    {
      id: 'reset_pin',
      text: t('pin_reset'),
      onPress: onPinResetPress,
      icon: (
        <View
          style={{
            backgroundColor: 'hotpink',
            width: 24,
            height: 24,
            borderRadius: 8,
          }}
        />
      ),
    },
  ];

  const renderSettingMenu = ({item, index}) => {
    return (
      <TouchableOpacity onPress={item.onPress} style={styles.itemButton}>
        {item.icon}
        <Text style={styles.itemText}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={appColors.primaryColor}
          animated
          barStyle={'light-content'}
        />
        <View style={styles.container}>
          <View style={styles.topSection}>
            <Avatar
              size={80}
              source={{
                uri: profile.profilePicture,
              }}
            />
            <Text style={styles.textName}>{name}</Text>
          </View>
          <View style={styles.menuContainer}>
            <FlatList
              data={settingMenuList}
              renderItem={renderSettingMenu}
              bounces={false}
              ItemSeparatorComponent={
                <View
                  style={{
                    height: 1,
                    backgroundColor: appColors.appBackground,
                  }}
                />
              }
            />
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.bottomSafeArea} />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: appColors.primaryColor,
  },
  bottomSafeArea: {
    flex: 0,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: appColors.primaryColor,
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    alignItems: 'center',
    rowGap: 12,
  },
  textName: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
  menuContainer: {
    flex: 1,
    backgroundColor: appColors.appBackground,
  },
  itemButton: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingMenu;
