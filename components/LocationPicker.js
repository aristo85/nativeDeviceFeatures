import React, { useState } from "react";
import { StyleSheet, Alert, View, Text, ActivityIndicator } from "react-native";
import colors from "../constants/colors";
import MyButton from "../components/MyButton";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  //asking permission for accessing users location
  const userPermission = async () => {
    const response = await Permissions.askAsync(Permissions.LOCATION);
    if (response.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant Location permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };
  //getting the users location
  const handleLocation = async () => {
    const isAllowed = await userPermission();
    if (!isAllowed) {
      return;
    }
    try {
      setIsLoading(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      props.onSetLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Insufficient request!",
        "Couldnt get your location, try again!",
        [{ text: "Okay" }]
      );
    }
    setIsLoading(false);
  };

  const pickOnMapHandler = () => {
      props.navigation.navigate('Map', {pickedOnPreview: props.location})
  }

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.spiner}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* resending the location to the map preview as param  */}
      <MapPreview location={props.location} pickOnMapHandler={pickOnMapHandler} />
      <View style={styles.btnContainer}>
      <MyButton
        title="get user location"
        onPress={handleLocation}
        color={colors.secondary}
      />
      <MyButton
        title="pick on map"
        onPress={pickOnMapHandler}
        color={colors.secondary}
      />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  spiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  }
});

export default LocationPicker;
