import * as React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthReducer} from '../redux/slices/authSlice';

import HomeScreen from '../screens/Home';
import PinSettingScreen from '../screens/Auth/PinSetting';
import PinLockScreen from '../screens/Auth/PinLock';
import SettingMenuScreen from '../screens/Setting/SettingMenu';
import {appColors} from '../const';
import PinResetLockScreen from '../screens/Setting/PinResetLock';
import PinResetScreen from '../screens/Setting/PinReset';
import {setCurrRoutename} from '../redux/slices/utilSlice';

const HomeStack = createNativeStackNavigator();
const Home = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: true,
        headerBackButtonMenuEnabled: false,
        headerTitle: '',
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: appColors.primaryColor},
        headerShadowVisible: false,
        headerTintColor: 'white',
      }}>
      <HomeStack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen name={'SettingMenu'} component={SettingMenuScreen} />
      <HomeStack.Screen
        name={'PinResetLock'}
        component={PinResetLockScreen}
        options={{
          headerStyle: {backgroundColor: appColors.primaryLightColor},
        }}
      />
      <HomeStack.Screen
        name={'PinReset'}
        component={PinResetScreen}
        options={{
          headerStyle: {backgroundColor: appColors.primaryLightColor},
        }}
      />
    </HomeStack.Navigator>
  );
};

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  const {savedPin} = useSelector(selectAuthReducer);
  const isUserSetPin = savedPin.length > 0;
  const initialRouteName = isUserSetPin ? 'PinLock' : 'PinSetting';
  return (
    <AuthStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name={'PinSetting'} component={PinSettingScreen} />
      <AuthStack.Screen name={'PinLock'} component={PinLockScreen} />
    </AuthStack.Navigator>
  );
};

const Route = () => {
  const {isLogin} = useSelector(selectAuthReducer);
  const dispatch = useDispatch();

  // route tracking
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = React.useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;

          dispatch(setCurrRoutename(currentRouteName));
        }
      }}>
      {isLogin ? <Home /> : <Auth />}
    </NavigationContainer>
  );
};

export default Route;
