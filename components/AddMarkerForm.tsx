import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Card from "./Card";
import { Location } from "../types";
import Input from "./Input";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import {
  saveLocation,
  selectLocations,
  setAddMarkerMode,
} from "../redux/slices/locationsSlice";

type AddMarkerFormProps = {
  location?: Location;
  onCancel: () => void;
};

const AddMarkerForm = ({ location, onCancel }: AddMarkerFormProps) => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  const { addMarkerMode } = useAppSelector(selectLocations);
  const handleAddMarker = () => {
    if (name && location) {
      dispatch(saveLocation({ name, location }));
      handleCancel();
    }
  };
  const handleCancel = () => {
    dispatch(setAddMarkerMode(false));
    onCancel();
  };
  return (
    <Card style={styles.container}>
      {!location ? (
        <Text style={[styles.text, { alignSelf: "center" }]}>
          Select a place on the map
        </Text>
      ) : (
        <View>
          <Text style={styles.text}>Name for this place:</Text>
          <Input style={styles.input} value={name} onChangeText={setName} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={() => {
                handleCancel();
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonAdd]}
              onPress={() => {
                handleAddMarker();
              }}
            >
              <Text style={styles.textStyle}>Add Location</Text>
              <Ionicons
                style={{ marginLeft: 5 }}
                name="add-circle"
                size={24}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Card>
  );
};

export default AddMarkerForm;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    width: "90%",
    zIndex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: "black",
  },
  input: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    flex: 0.5,
    elevation: 2,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonAdd: {
    backgroundColor: Colors.primary,
  },
  buttonCancel: {
    backgroundColor: Colors.gray,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
