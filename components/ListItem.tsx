import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MarkerType } from "../types";
import { Colors } from "../constants";
import { useAppDispatch } from "../redux/hooks";
import { removeLocation } from "../redux/slices/locationsSlice";

type ListItemProps = {
  item: MarkerType;
  onPressElement: (id: string, lat: number, long: number) => void;
};

export const ListItem = ({ item, onPressElement }: ListItemProps) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(removeLocation(item.id));
  };
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#FAFAFA" : "white",
        },
        styles.container,
      ]}
      onPress={() => onPressElement(item.id, item.latitude, item.longitude)}
    >
      <View style={styles.item}>
        <View style={[styles.logo, { backgroundColor: item.color }]}>
          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={styles.logoImage}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={{ width: "60%" }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.direction}>{item.direction}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash" size={24} color={Colors.gray} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    height: "80%",
    width: "80%",
    borderRadius: 50,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2F3136",
  },
  direction: {
    fontSize: 14,
    fontWeight: "400",
    color: "#989CA5",
  },
  deleteButton: {
    width: "15%",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.error,
    alignContent: "center",
    borderRadius: 10,
    elevation: 2,
  },
});
