import React, {useState} from 'react';
import {View, Text} from 'native-base';
import {StyleSheet, Alert} from 'react-native';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {Colors} from '../../constants/Colors';
import FlatButton from '../Ui/FlatButton';
import {IsCredentials} from '../../helpers/interface';
import AuthForm from '../Auth/AuthForm';
import {StackNavigationProp} from '@react-navigation/stack';

interface IProps {
  isLogin: boolean;
  onAuthenticate: (email: string, password: string) => void;
}

const AuthContent = (props: IProps) => {
  const navigation = useNavigation<any>();
  const [credentialsInvalid, setCredentialsInvalid] = useState<IsCredentials>({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });
  const switchAuthModeHandler = () => {
    if (props.isLogin) {
      navigation.replace('SignUp');
    } else {
      navigation.replace('Login');
    }
  };
  function submitHandler(
    email: string,
    confirmEmail: string,
    password: string,
    confirmPassword: string,
  ) {
    email = email.trim();
    password = password.trim();
    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;
    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!props.isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    props.onAuthenticate(email, password);
  }
  return (
    <View style={[styles.authContent, {marginTop: props.isLogin ? 230 : 150}]}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
          Login Here 😊
        </Text>
      </View>
      <AuthForm
        isLogin={props.isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {props.isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
    </View>
  );
};
export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginHorizontal: 25,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
