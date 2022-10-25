import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { MarkerType } from "../types";

type ListItemProps = {
  item: MarkerType;
  onPressElement: (id: string, lat: number, long: number) => void;
};

export const ListItem = ({ item, onPressElement }: ListItemProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#FAFAFA" : "white",
        },
        styles.item,
      ]}
      onPress={() => onPressElement(item.id, item.latitude, item.longitude)}
    >
      <View style={[styles.logo, { backgroundColor: item.color }]}>
        {/* <Image
          source={item.img}
          style={styles.logoImage}
          resizeMode="contain"
        /> */}
      </View>
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.direction}>{item.direction}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    height: "65%",
    width: "65%",
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
});
