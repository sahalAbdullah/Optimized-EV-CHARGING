import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    return status === RESULTS.GRANTED;
  } catch (error) {
    console.warn('Error requesting location permission:', error);
    return false;
  }
};
