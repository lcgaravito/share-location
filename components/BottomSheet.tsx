import {
  Dimensions,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import { MarkerType } from "../types";
import { ListItem } from "./ListItem";
import { useAppSelector } from "../redux/hooks";
import { selectLocations } from "../redux/slices/locationsSlice";
import { AddMarkerButton } from "./AddMarkerButton";

type BottomSheetProps = {
  onPressElement: (id: string, lat: number, long: number) => void;
};

const windowHeight = Dimensions.get("window").height;

const BottomSheet = ({ onPressElement }: BottomSheetProps) => {
  const { markers } = useAppSelector(selectLocations);
  const renderItem: ListRenderItem<MarkerType> = ({ item }) => (
    <ListItem
      item={item}
      onPressElement={() =>
        onPressElement(item.id, item.latitude, item.longitude)
      }
    />
  );

  return (
    <ScrollBottomSheet<MarkerType>
      componentType="FlatList"
      snapPoints={[100, "60%", windowHeight - 200]}
      initialSnapIndex={1}
      renderHandle={() => (
        <View style={styles.header}>
          <View style={styles.panelHandle} />
        </View>
      )}
      data={markers}
      keyExtractor={(i) => i.id}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>Add a marker by pressing the button</Text>
          <AddMarkerButton width={50} height={50} />
        </View>
      }
    />
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  panelHandle: {
    width: 41,
    height: 4,
    backgroundColor: "#E1E1E1",
    borderRadius: 17,
  },
  emptyContainer: {
    alignItems: "center",
  },
});
