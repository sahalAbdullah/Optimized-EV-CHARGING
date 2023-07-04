import {Pressable, Text, View} from 'native-base';
import {Colors} from '../../constants/Colors';
import {StyleSheet} from 'react-native';

interface IProps {
  children: string;
  onPress: () => void;
}
const FlatButton = (props: IProps) => {
  return (
    <Pressable onPress={props.onPress}>
      {({isPressed}: {isPressed: boolean}) => {
        return (
          <View style={[styles.button, isPressed && styles.pressed]}>
            <Text style={styles.buttonText}>{props.children}</Text>
          </View>
        );
      }}
    </Pressable>
  );
};

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.primary100,
  },
});
