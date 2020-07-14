import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Platform,
  Text,
} from "react-native";
import TextTitle from "../components/TextTitle";
import MapView, { Marker } from "react-native-maps";
import colors from "../constants/colors";

const MapFullScreen = (props) => {
  const pickedOnPreview = props.navigation.getParam("pickedOnPreview");
  const selectedcoord = props.navigation.getParam("selectedcoord");
  const [coordinate, setCoordinate] = useState(
    pickedOnPreview ? pickedOnPreview : selectedcoord ? selectedcoord : null
  );
  const mapRegion = {
    latitude: coordinate ? coordinate.lat : 37.78,
    longitude: coordinate ? coordinate.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!coordinate) {
      return;
    }
    props.navigation.navigate("AddPlace", { pickedOnMapLocation: coordinate });
  });

  useEffect(() => {
    props.navigation.setParams({
      saveLocation: savePickedLocationHandler,
    });
  }, [coordinate]);

  const handlePress = (event) => {
    if(props.navigation.getParam('onlyRead')){
      return;
    }
    const newCoord = {
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    };
    setCoordinate(newCoord);
  };

  return (
    <MapView style={styles.map} region={mapRegion} onPress={handlePress}>
      {coordinate ? (
        <Marker
          title="picked location"
          coordinate={{ latitude: coordinate.lat, longitude: coordinate.lng }}
        />
      ) : null}
    </MapView>
  );
};

MapFullScreen.navigationOptions = (navigationDat) => {
  const savefunc = navigationDat.navigation.getParam("saveLocation");
  const onlyRead = navigationDat.navigation.getParam("onlyRead");

  return {
    // headerTitle: selectedMeal.title,
    headerRight: () => {
      return onlyRead ? null : (
        <TouchableOpacity style={styles.headerButton} onPress={savefunc}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({
  spiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  map: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : colors.primary,
  },
});

export default MapFullScreen;
