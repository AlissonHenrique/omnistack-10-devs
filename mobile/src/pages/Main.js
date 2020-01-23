import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text } from "react-native";
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api'

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([])
  const [techs, setTechs] = useState('')
  useEffect(() => {
    async function loadInitPosition() {
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
    loadInitPosition()
  }, [])

  async function loadDevs() {
    const { latitude, longitude } = currentRegion
    const response = api.get('/search', {
      params: {
        latitude,
        longitude,
        techs: 'ReactJs'
      }
    })
    setDevs(response.data.devs)
  }

  if (!currentRegion) {
    return null;
  }


  async function handleRegionChange(region) {
    setCurrentRegion(region)
  }
  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChange}
        initialRegion={currentRegion}
        style={styles.map}
      >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[0],
              longitude: dev.location.coordinates[1]
            }}>
            <Image style={styles.avatar} source={{ uri: "https://avatars3.githubusercontent.com/u/17318431?s=460&v=4" }} />
            <Callout
              onPress={() => {
                navigation.navigate("Profile", { github_uresername: "AlissonHenrique" });
              }}
            >
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>


        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar po techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}


        />
        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
          <Text>
            <MaterialIcons name="my-location" size={20} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D7086"
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#fff"
  },
  // Devs
  callout: {
    width: 260,
    height: 250,
    padding: 10
  },
  devName: {
    fontWeight: "bold"
  },
  devBio: {
    fontSize: 12,
    color: "#666",
    marginTop: 5
  },
  devTechs: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5
  },
  tech: {
    backgroundColor: "#7551d7",
    color: "#fff",
    fontSize: 10,
    margin: 2,
    paddingHorizontal: 5,
    borderRadius: 5
  },
  searchForm: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row"
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: "#7d40e7",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  }
});
