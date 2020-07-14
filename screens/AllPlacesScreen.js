import React, { useEffect } from "react";
import { StyleSheet, View, Button, Platform, FlatList } from "react-native";
import TextTitle from "../components/TextTitle";
import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import PlaceItem from "../components/PlaceItem";
import { useSelector, useDispatch } from "react-redux";
import { getAllPlaces } from "../store/actions";

const AllPlacesScreen = (props) => {
  const placeList = useSelector((state) => state.placeReducer.placeList);
  const dispatch = useDispatch();

  useEffect(() => {
    const getList = async () => await dispatch(getAllPlaces());
    getList();
  }, [dispatch]);

  // useEffect(() => {

  // })

  return (
    <FlatList
      data={placeList}
      renderItem={({ item }) => (
        <PlaceItem
          title={item.title}
          image={item.image}
          address={item.address}
          onSelect={() => {
             props.navigation.navigate('Detail', {placeId: item.id, title: item.title});
          }}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};

AllPlacesScreen.navigationOptions = (navDadta) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "ios" ? "ios-add" : "md-add"}
          onPress={() => {
            navDadta.navigation.navigate("AddPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
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
    justifyContent: "center",
    alignContent: "center",
  },
});

export default AllPlacesScreen;
