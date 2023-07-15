import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, VStack, Text, Pressable, Spinner, useToast} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  allamIqbalTown,
  joharTown,
  kalmaChowk,
} from '../../constants/LocationPlaces';
import ActionAccept from '../../components/Ui/actionAccept';

const MapShow = (props: any) => {
  const GOOGLE_MAPS_APIKEY = 'ADD your Google API key here';
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [station1, setStation1] = useState<boolean>(false);
  const [station2, setStation2] = useState<boolean>(false);
  const [station3, setStation3] = useState<boolean>(false);
  const closeHandler = () => {
    console.log('Action Sheet Closed');
  };
  const [paramsState, setParamsState] = useState<any>({
    station1: {
      distance: 0,
      time: 0,
    },
    station2: {
      distance: 0,
      time: 0,
    },
    station3: {
      distance: 0,
      time: 0,
    },
  });
  const charge1 = (distance: number, time: number) => {
    console.log('Distance Here1:', distance, time);
    setParamsState((prevState: any) => ({
      ...prevState,
      station1: {
        distance: distance,
        time: time,
      },
    }));
  };
  const charge2 = (distance: number, time: number) => {
    console.log('Distance Here2:', distance, time);
    setParamsState((prevState: any) => ({
      ...prevState,
      station2: {
        distance: distance,
        time: time,
      },
    }));
  };
  const charge3 = (distance: number, time: number) => {
    console.log('Distance Here3:', distance, time);
    setParamsState((prevState: any) => ({
      ...prevState,
      station3: {
        distance: distance,
        time: time,
      },
      soc: props.soc,
    }));
  };
  const showState = () => {
    if (loadingData) {
    } else {
      console.log('In Maps:', paramsState);
      const params = props.dataHandler(paramsState);
      console.log('Params Here:', params);
      setStation1(false);
      setStation2(false);
      setStation3(false);
    }
    // setLoadingData(true);
  };
  const pinColor = 'blue';
  const loaderHandler = () => {
    setLoadingData(false);
  };
  const mapShow = (station: string) => {
    if (station === 'station1') {
      setStation1(true);
    }
    if (station === 'station2') {
      setStation2(true);
    }
    if (station === 'station3') {
      setStation3(true);
    }
  };
  return (
    <VStack>
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={props.myProps.myLocation}>
          {/* My Location */}
          <Marker
            pinColor={pinColor}
            coordinate={{
              latitude: props.myProps.myLocation.latitude,
              longitude: props.myProps.myLocation.longitude,
            }}
          />
          {/* Allam Iqbal Town */}
          <Marker
            pinColor={station1 ? 'blue' : 'red'}
            coordinate={{latitude: 31.4805, longitude: 74.3239}}
          />
          {/* Kalma Chowk */}
          <Marker
            pinColor={station2 ? 'blue' : 'red'}
            coordinate={{latitude: 31.504382, longitude: 74.331527}}
          />

          {/* Johar Town */}
          <Marker
            pinColor={station3 ? 'blue' : 'red'}
            coordinate={{latitude: 31.4697, longitude: 74.2728}}
          />
          <MapViewDirections
            origin={props.myProps.myLocation}
            destination={allamIqbalTown}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={station1 ? 7 : 0}
            strokeColor="blue"
            onReady={result => {
              charge1(result.distance, result.duration);
            }}
          />
          <MapViewDirections
            origin={props.myProps.myLocation}
            destination={kalmaChowk}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={station2 ? 7 : 0}
            strokeColor="blue"
            onReady={result => {
              charge2(result.distance, result.duration);
            }}
          />
          <MapViewDirections
            origin={props.myProps.myLocation}
            destination={joharTown}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={station3 ? 7 : 0}
            strokeColor="blue"
            onReady={result => {
              charge3(result.distance, result.duration);
            }}
          />
        </MapView>
      </View>
      <Pressable flexDirection={'row-reverse'} onPress={showState}>
        {({isPressed}) => (
          <View
            style={{
              padding: 12,
              elevation: 10,
              borderRadius: 12,
              backgroundColor: 'lightblue',
              opacity: isPressed ? 0.55 : 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: 130,
              height: 50,
              marginRight: 12,
            }}>
            {loadingData ? <Spinner /> : <Text>Request Initiate</Text>}
          </View>
        )}
      </Pressable>
      <ActionAccept
        onClose={closeHandler}
        time1={paramsState?.station1?.time}
        time2={paramsState?.station2?.time}
        time3={paramsState?.station3?.time}
        loaderHandler={loaderHandler}
        mapShow={mapShow}
      />
    </VStack>
  );
};
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    height: 550,
    width: 370,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 18,
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12,
    elevation: 2,
  },
});
export default MapShow;
