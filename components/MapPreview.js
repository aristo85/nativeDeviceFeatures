import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import TextTitle from "./TextTitle";
import ENV from "../env";

const MapPreview = (props) => {
    let staticMapImage;
    if(props.location){
   staticMapImage = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.APIKey}`;
// console.log(sta)
}

  return (
    <TouchableOpacity style={styles.mapContainer} onPress={props.pickOnMapHandler}>
      {!props.location ? (
        <TextTitle>No Location Chosen yet!</TextTitle>
      ) : (
        <Image source={{ uri: staticMapImage }} style={styles.image} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: "100%",
    height: 200,
    borderWidth: 1,
    margin: 10,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
