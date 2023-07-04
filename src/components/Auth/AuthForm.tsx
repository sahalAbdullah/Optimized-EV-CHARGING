import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import CustomButton from '../Ui/CustomButton';
import CustomInput from './CustomInput';
import {IsCredentials} from '../../helpers/interface';
interface IProps {
  isLogin: boolean;
  onSubmit: (
    email: string,
    confirmEmail: string,
    password: string,
    confirmPassword: string,
  ) => void;
  credentialsInvalid: IsCredentials;
}

const AuthForm = (props: IProps) => {
  const [enteredEmail, setEnteredEmail] = useState<string>('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState<string>('');
  const [enteredPassword, setEnteredPassword] = useState<string>('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] =
    useState<string>('');
  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = props.credentialsInvalid;
  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }
  function submitHandler() {
    props.onSubmit(
      enteredEmail,
      enteredConfirmEmail,
      enteredPassword,
      enteredConfirmPassword,
    );
  }
  return (
    <View>
      <View>
        <CustomInput
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          secure={false}
        />
        {!props.isLogin && (
          <CustomInput
            label="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
            secure={false}
          />
        )}
        <CustomInput
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
          keyboardType="password"
        />
        {!props.isLogin && (
          <CustomInput
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword',
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
            keyboardType="password"
          />
        )}
        <View style={styles.buttons}>
          <CustomButton onPress={submitHandler}>
            {props.isLogin ? 'Log In' : 'Sign Up'}
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default AuthForm;
const styles = StyleSheet.create({
  buttons: {
    marginTop: 22,
  },
});
