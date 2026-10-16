import {StyleSheet} from 'react-native';

import React from 'react';
import {View, Spinner, Text} from 'native-base';

const LoadinOverlay = () => {
  return (
    <View style={styles.loader}>
      <Spinner size="lg" color="emerald.500" />
      <Text
        style={{
          color: 'pink',
          fontSize: 22,
          fontWeight: 'bold',
          padding: 19,
        }}>
        Wait....
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    borderColor: 'black',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
});

export default LoadinOverlay;
