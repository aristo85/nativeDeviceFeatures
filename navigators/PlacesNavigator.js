import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform, StatusBar } from 'react-native';
import AllPlacesScreen from "../screens/AllPlacesScreen";
import DetailPlaceScreen from "../screens/DetailPlaceScreen";
import AddPlaceScreen from "../screens/AddPlaceScreen";
import MapFullScreen from "../screens/MapFullScreen";
import colors from "../constants/colors";

const PlacesNavigator = createStackNavigator(
  {
    AllPlaces: AllPlacesScreen,
    Detail: DetailPlaceScreen,
    AddPlace: AddPlaceScreen,
    Map: MapFullScreen,
  },
  {
    defaultNavigationOptions: {
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        },
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.primary,
        height: 70,
      },
    },
  }
);

export default createAppContainer(PlacesNavigator);
