import * as FileSystem from "expo-file-system";
import { storingData, fetchingPlaces } from "../helper/db";
import ENV from '../env';

export const ADD_PLACE = "ADD_PLACE";
export const GET_ALL_PLACES = "GET_ALL_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    //getting the fileName
    const fileName = image.split("/").pop();
    //creating a local path in fileSystem for the file
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      //moving the image to fileSystem with new path
      await FileSystem.moveAsync({ from: image, to: newPath });
      //getting the address from google api by coordinate
      const responseAdd = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.APIKey}`
      );
      if(!responseAdd.ok){
        throw new Error('something wrong with the server api')
      }
      const resDadta = await responseAdd.json();
      const address = resDadta.results[0].formatted_address;
      //saving the data to sqlite DB
      const savedToDB = await storingData(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      dispatch({
        type: ADD_PLACE,
        id: savedToDB.insertId,
        title: title,
        image: newPath,
        address: address,
        lat: location.lat,
        lng: location.lng
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const getAllPlaces = () => {
  return async (dispatch) => {
    try {
      const allPlacesResponse = await fetchingPlaces();
      dispatch({
        type: GET_ALL_PLACES,
        placeList: allPlacesResponse.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
