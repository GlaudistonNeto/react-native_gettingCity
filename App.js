import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

let apiKey = 'YOUR_API_KEY';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [getLocation, setGetLocation] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      Location.setGoogleApiKey(apiKey);

      console.log(status);

      let regionName = await Location.reverseGeocodeAsync({
        latitude: -14.7935,
        longitude: -39.0464,
      });

      setLocation(regionName);
      console.log(regionName, 'nothing');

      // console.log();
    })();
  }, [getLocation]);


  return (
    <View style={styles.container}>
      <Text style={styles.big}>
        {!location ? 'Waiting' : JSON.stringify(location[0]["subregion"])}
      </Text>
      <TouchableOpacity onPress={() => setGetLocation(!getLocation)}>
        <View
          style={{
            height: 100,
            backgroundColor: 'teal',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Text style={styles.btnText}> GET LOCATION </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  big: {
    fontSize: 18,
    color: 'black',
    fontWeight: "bold"
  },
  btnText:{
    fontWeight: "bold",
    fontSize: 25,
    color: "white"
  }
});
