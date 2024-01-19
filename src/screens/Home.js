import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  AppState,
} from 'react-native';
import {appColors} from '../const';
import {useTranslation} from 'react-i18next';
import TopSection from '../components/Home/TopSection';
import TodoList from '../components/Home/TodoList';
import DoingList from '../components/Home/DoingList';
import DoneList from '../components/Home/DoneList';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLogin} from '../redux/slices/authSlice';
import {selectUtilReducer} from '../redux/slices/utilSlice';

const Home = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {currRouteName} = useSelector(selectUtilReducer);
  const appState = useRef(AppState.currentState);
  const [activeTab, setActiveTab] = useState(0);
  const [tabHeight, setTabHeight] = useState(0);
  const [bgTime, setBgTime] = useState(0);

  const PINLOCK_LIMIT = 10 * 1000; // 10 sec

  useEffect(() => {
    // APP STATE LISTENER
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current === 'background' && nextAppState === 'active') {
        console.log('App has come to the foreground!');

        const epochNow = new Date().getTime();
        if (epochNow - bgTime > PINLOCK_LIMIT) {
          // show pinlock
          dispatch(setIsLogin(false));
        }
      } else if (
        appState.current.match(/inactive|active/) &&
        nextAppState === 'background'
      ) {
        console.log('App has gone to the background!');

        // set time for showing pin lock
        const epoch = new Date().getTime();
        setBgTime(epoch);
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, [bgTime]);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={appColors.primaryColor}
          animated
          barStyle={'light-content'}
        />
        <View style={styles.container}>
          <TopSection />
          <View style={{zIndex: 1}}>
            <View
              style={[styles.tabContainer, {marginTop: -tabHeight / 2}]}
              onLayout={({nativeEvent}) =>
                setTabHeight(nativeEvent.layout.height)
              }>
              <TouchableOpacity
                onPress={() => setActiveTab(0)}
                style={[styles.tab, activeTab === 0 && styles.tabActive]}>
                <Text
                  style={
                    activeTab === 0
                      ? styles.tabTextActive
                      : styles.tabTextInactive
                  }>
                  {t('todo')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab(1)}
                style={[styles.tab, activeTab === 1 && styles.tabActive]}>
                <Text
                  style={
                    activeTab === 1
                      ? styles.tabTextActive
                      : styles.tabTextInactive
                  }>
                  {t('doing')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab(2)}
                style={[styles.tab, activeTab === 2 && styles.tabActive]}>
                <Text
                  style={
                    activeTab === 2
                      ? styles.tabTextActive
                      : styles.tabTextInactive
                  }>
                  {t('done')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {activeTab === 0 ? (
            <TodoList />
          ) : activeTab === 1 ? (
            <DoingList />
          ) : activeTab === 2 ? (
            <DoneList />
          ) : (
            <></>
          )}
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
    // backgroundColor: appColors.appBackground,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: appColors.primaryColor,
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
  },
  tabContainer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: appColors.inactiveBackground,
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 555,
    columnGap: 8,

    // shadow
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // android
    elevation: 2,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 555,
  },
  tabActive: {
    backgroundColor: appColors.primaryColor,
  },
  tabInactive: {
    backgroundColor: 'transparent',
  },
  tabTextActive: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabTextInactive: {
    color: appColors.inactiveText,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Home;
