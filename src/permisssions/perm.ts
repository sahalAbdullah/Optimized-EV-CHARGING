import {request, PERMISSIONS} from 'react-native-permissions';
export const requestLocationPermission = async () => {
  try {
    const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (granted === 'granted') {
      console.log('Location permission granted');
    } else {
      console.log('Location permission denied');
    }
  } catch (error) {
    console.log('Error requesting location permission:', error);
  }
};
