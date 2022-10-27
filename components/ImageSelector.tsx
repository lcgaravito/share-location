import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { Colors } from "../constants";
import { Ionicons } from "@expo/vector-icons";

type ImageSelectorProps = {
  onImage: (image: string) => void;
};

const ImageSelector = ({ onImage }: ImageSelectorProps) => {
  const verifyPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permisos insuficientes",
        "Necesita dar permisos de la cámara para usar la applicación",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const handlerTakeImage = async () => {
    const isCameraOk = verifyPermissions();
    if (!isCameraOk) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.8,
    });

    if (!result.cancelled) {
      const { uri } = result as ImageInfo;
      setPickedURL(uri);
      onImage(uri);
    }
  };

  const [pickedURL, setPickedURL] = useState<string>();
  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedURL ? (
          <Text>No image picked yet!</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedURL }} />
        )}
      </View>
      <TouchableOpacity style={[styles.button]} onPress={handlerTakeImage}>
        <Text style={styles.textStyle}>Take Photo</Text>
        <Ionicons
          style={{ marginLeft: 5 }}
          name="camera"
          size={24}
          color={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  preview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  button: {
    elevation: 2,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});

export default ImageSelector;
