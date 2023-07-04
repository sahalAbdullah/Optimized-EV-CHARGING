import React from 'react';
import AuthContent from '../components/Auth/AuthContent';
import {useContext, useState, useEffect} from 'react';
import LoadingOverlay from '../components/Ui/LoadindOverlay';
import {View, Text} from 'native-base';
import {Colors} from '../constants/Colors';

import {login} from '../../util/auth';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {authToken} from '../features/authentication/authentication';
const Login = () => {
  const [isAuthentication, setIsAuthentication] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // geolocation.requestAuthorization();
  });

  const loginHandler = async (email: string, password: string) => {
    setIsAuthentication(true);
    try {
      const token = await login(email, password);
      AsyncStorage.setItem('token', token);
      dispatch(authToken(true));
    } catch (error) {
      Alert.alert(
        'Authentication Failed!',
        'Could not log you in , Please Check your credentials',
      );
    }
    setIsAuthentication(false);
  };

  if (isAuthentication) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primary100,
        }}>
        <LoadingOverlay />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primary100,
      }}>
      <AuthContent isLogin={true} onAuthenticate={loginHandler} />
    </View>
  );
};

export default Login;
