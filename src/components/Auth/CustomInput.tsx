import {View, Text, Input} from 'native-base';
import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

interface IProps {
  label: string;
  value: string;
  keyboardType: string;
  isInvalid: boolean;
  secure: boolean;
  onUpdateValue: (inputType: string, enteredValue: string) => void;
}

const CustomInput = (props: IProps) => {
  let inputType = '';

  if (props.label === 'Email Address') {
    inputType = 'email';
  } else if (props.label === 'Confirm Email Address') {
    inputType = 'confirmEmail';
  } else if (props.label === 'Password') {
    inputType = 'password';
  } else if (props.label === 'Confirm Password') {
    inputType = 'confirmPassword';
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, props.isInvalid && styles.labelInvalid]}>
        {props.label}
      </Text>
      <Input
        style={[styles.input, props.isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        wrapperRef={props.keyboardType}
        //keyboardType={props.keyboardType}
        // Type={props.keyboardType}
        secureTextEntry={props.secure}
        onChangeText={(val: string) => props.onUpdateValue(val, inputType)}
        value={props.value}
      />
    </View>
  );
};
export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
