import React from 'react';
import Route from './src/navigation/Route';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import './src/i18n/i18n';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <Route />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
