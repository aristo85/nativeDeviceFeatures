import React from "react";
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import TextTitle from "../components/TextTitle";
import MapPreview from "../components/MapPreview";
import { useSelector } from "react-redux";
import colors from "../constants/colors";

const DetailPlaceScreen = (props) => {
  const placeId = props.navigation.getParam("placeId");
  const selectedPlace = useSelector((state) =>
    state.placeReducer.placeList.find((place) => place.id === placeId)
  );

  const placeCoordinate = {
    lat: selectedPlace.lat,
    lng: selectedPlace.lng,
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map", {
      onlyRead: true,
      selectedcoord: placeCoordinate,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace.image }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <TextTitle style={styles.address}>{selectedPlace.address}</TextTitle>
        </View>
        {/* <TouchableOpacity
        style={{width: '100%', height: '100%'}}
          
        > */}
        <MapPreview
          style={styles.mapPreview}
          location={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
          pickOnMapHandler={pickOnMapHandler}
        />
        {/* </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

DetailPlaceScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("title"),
  };
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default DetailPlaceScreen;
