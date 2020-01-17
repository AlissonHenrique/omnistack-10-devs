import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";
export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadlInitialPosition() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }
    loadlInitialPosition();
  });

  if (!currentRegion) {
    return null;
  }

  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -27.2111164, longitude: -49.6374491 }}>
        <Image style={styles.avatar} source={{ uri: "asdasd" }} />
        <Callout
          onPress={() => {
            navigation.navigate("Profile", { github_uresername: "diego3g" });
          }}
        >
          <View style={styles.callout}>
            <Text style={styles.devName}>Asd</Text>
            <Text style={styles.devBio}>Asd</Text>
            <Text style={styles.devTechs}>Asd</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#fff"
  },
  callout: {
    width: 260
  },
  devBio: {
    color: "#666",
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  }
});
