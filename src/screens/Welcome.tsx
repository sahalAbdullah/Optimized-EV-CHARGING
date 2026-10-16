import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Pressable, HStack} from 'native-base';
import {Colors} from '../constants/Colors';
import Geolocation from '@react-native-community/geolocation';
import {firebase} from '@react-native-firebase/database';
import {FIREBASE_CONFIG, DEMO_USER_ID} from '../../config';
import MapShow from '../components/mapComp/MapShow';
import {requestLocationPermission} from '../permissions/perm';
const Welcome = () => {
  const [soc, setSoc] = useState<string>();
  const [, setParamsState] = useState<any>({
    station1: {
      distance: 0.0,
      time: 0.0,
    },
    station2: {
      distance: 0.0,
      time: 0.0,
    },
    station3: {
      distance: 0.0,
      time: 0.0,
    },
    soc: 0.0,
  });

  const updateSoc = useCallback(
    (value: string) => {
      setSoc(value);
    },
    [soc],
  );
  const [stateUse, setStateUse] = useState<any>({
    myLocation: {
      longitude: 0,
      latitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const user = DEMO_USER_ID;
  const params = (data: any) => {
    setParamsState((prevState: any) => ({
      ...prevState,
      station1: {
        distance: data.station1.distance,
        time: data.station1.time,
      },
      station2: {
        distance: data.station2.distance,
        time: data.station2.time,
      },
      station3: {
        distance: data.station3.distance,
        time: data.station3.time,
      },
    }));
  };

  firebase
    .app()
    .database(FIREBASE_CONFIG.databaseURL)
    .ref(`/message/${user}`)
    .on('value', snapshot => {
      updateSoc(snapshot.val());
    });
  useEffect(() => {
    requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        setStateUse(() => ({
          myLocation: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        }));
      },
      error => {
        console.warn('Error getting current location:', error);
      },
      {
        enableHighAccuracy: true, // Use GPS if available
        timeout: 1500, // Timeout after 15 seconds
      },
    );
  }, []);
  useEffect(() => {
    setParamsState((prevState: any) => ({
      ...prevState,
      soc: soc,
    }));
  }, [soc]);

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <HStack justifyContent={'space-evenly'}>
        <View
          style={{
            marginTop: 15,
            padding: 12,
            width: 152,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 12,
            backgroundColor: Colors.primary500,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: !!soc ? 'white' : '#ccc',
            }}>
            SOC: {!!soc ? `${soc}%` : 'Not Registered'}
          </Text>
        </View>
        <Pressable>
          {({isPressed}) => (
            <View
              style={{
                width: 152,
                height: 40,
                marginTop: 15,
                padding: 12,
                backgroundColor: 'yellow',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 12,
                elevation: 3,
                opacity: isPressed ? 0.55 : 1,
              }}>
              <Text style={{color: '#f70d1a'}}>Wallet</Text>
            </View>
          )}
        </Pressable>
      </HStack>
      {!!stateUse.myLocation.longitude && !!soc ? (
        <MapShow myProps={stateUse} dataHandler={params} soc={soc} />
      ) : null}
      {/* <Pressable>
        {({isPressed}) => (
          <View
            style={{
              padding: 12,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              elevation: 10,
              borderRadius: 12,
              backgroundColor: 'lightblue',
              opacity: isPressed ? 0.55 : 1,
            }}>
            <Text>Press me</Text>
          </View>
        )}
      </Pressable> */}
    </View>
  );
};

export default Welcome;
