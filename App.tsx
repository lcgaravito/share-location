import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { init } from "./db";
import store from "./redux/store";
import { MapScreen } from "./screens";

init()
  .then(() => console.log("Database initialized"))
  .catch((err) => {
    console.log("Database failed to connect");
    console.log(err.message);
  });

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MapScreen />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
