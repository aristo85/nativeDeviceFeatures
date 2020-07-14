import Place from "../models/PlaceModel";

import { ADD_PLACE, GET_ALL_PLACES } from "./actions";

const initialState = {
  placeList: [],
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        placeList: [
          ...state.placeList,
          new Place(
            action.id.toString(),
            action.title,
            action.image,
            action.address,
            action.lat,
            action.lng
          ),
        ],
      };
    case GET_ALL_PLACES:
      return {
        ...state,
        placeList: action.placeList.map(
          (place) =>
            new Place(
              place.id.toString(),
              place.title,
              place.imageUrl,
              place.address,
              place.lat,
              place.lng
            )
        ),
      };
    default:
      return state;
  }
};

export default placeReducer;
