import React, { useState } from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import TextTitle from "./TextTitle";
import MyButton from "../components/MyButton";
import * as Permissions from "expo-permissions";
import colors from "../constants/colors";

const ImgPicker = (props) => {
  const userPermission = async () => {
    const response = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (response.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const handleCamera = async () => {
    const isAllowed = await userPermission();
    if (!isAllowed) {
      return;
    }
    const picture = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    props.onSetImage(picture.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        {!props.image ? (
          <TextTitle>No picture been picked yet!</TextTitle>
        ) : (
          <Image style={styles.image} source={{ uri: props.image }} />
        )}
      </View>
      <View>
        <MyButton
          title="Take a Picture"
          onPress={handleCamera}
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
  imgContainer: {
    flex: 1,
    width: "100%",
    height: 300,
    borderWidth: 1,
    margin: 10,
    justifyContent: 'center',
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImgPicker;
