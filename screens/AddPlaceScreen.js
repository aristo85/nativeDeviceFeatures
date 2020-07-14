import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, ScrollView, TextInput } from "react-native";
import TextTitle from "../components/TextTitle";
import colors from "../constants/colors";
import MyButton from "../components/MyButton";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/actions";
import ImgPicker from "../components/ImgPicker";
import LocationPicker from "../components/LocationPicker";

const AddPlaceScreen = (props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [myLocation, setMyLocation] = useState(null);

  const dispatch = useDispatch();

  const pickedOnMapLocation = props.navigation.getParam('pickedOnMapLocation')

  useEffect(() => {
    if(pickedOnMapLocation) {
      setMyLocation(pickedOnMapLocation)
    }
  }, [pickedOnMapLocation])

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextTitle style={styles.label}>Title</TextTitle>
        <TextInput
          autoCapitalize="none"
          value={title}
          style={styles.input}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <ImgPicker onSetImage={(img) => setImage(img)} image={image} />
      <LocationPicker
        onSetLocation={(loc) => setMyLocation(loc)}
        location={myLocation}
        navigation={props.navigation}
      />
      <Button
        title="Add A New Place"
        color={colors.primary}
        onPress={() => {
          dispatch(addPlace(title, image, myLocation));
          props.navigation.navigate("AllPlaces");
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  spiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  screen: {
    flex: 1,
    margin: 10,
  },
  gradient: {
    height: "100%",
    width: "100%",
  },
  inputContainer: {},
  label: {
    justifyContent: "flex-start",
    textAlign: "left",
  },
  input: {
    borderBottomWidth: 1,
    width: "100%",
  },
});

export default AddPlaceScreen;
