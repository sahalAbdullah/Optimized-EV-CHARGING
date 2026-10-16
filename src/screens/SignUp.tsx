import React from 'react';
import AuthContent from '../components/Auth/AuthContent';
import {useState} from 'react';
import LoadingOverlay from '../components/Ui/LoadingOverlay';
import {View} from 'native-base';
import {Colors} from '../constants/Colors';
import {Alert} from 'react-native';
import {createUser} from '../../util/auth';
import {useNavigation} from '@react-navigation/native';
import {db} from '../../util/firebase';
import {ref, set} from 'firebase/database';
const SignUp = () => {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const navigation = useNavigation<any>();

  const signupHandler = async (email: string, password: string) => {
    setIsAuthentication(true);
    try {
      const localId = await createUser(email, password);
      set(ref(db, 'initiateRequest/' + localId), {
        request: 'null',
        response: 'null',
      });
      navigation.replace('Login');
    } catch (error) {
      console.warn('Sign-up failed:', error);
      Alert.alert(
        'Authentication Failed!',
        'Could not create user, Please check your input and try again later.',
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
      <AuthContent isLogin={false} onAuthenticate={signupHandler} />
    </View>
  );
};

export default SignUp;
