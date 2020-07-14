import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import PlacesNavigator from "./navigators/PlacesNavigator";
import colors from "./constants/colors";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import placeReducer from "./store/reducers";
import ReduxThunk from 'redux-thunk';
import { init } from './helper/db';

init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
  });

const rootReducer = combineReducers({
  placeReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts} //this has to be a function and return a promise
        onFinish={() => setDataLoaded(true)} //a listener
        onError={(error) => console.log(error)} // in case of error fetchin, we can shoe alternative component or ~cl~
      />
    );
  }

  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.third,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    padding: 24,
  },
});
