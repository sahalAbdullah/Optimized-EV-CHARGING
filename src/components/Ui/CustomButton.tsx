import {Pressable, Text, View} from 'native-base';
import {Colors} from '../../constants/Colors';
import {StyleSheet} from 'react-native';

interface IProps {
  children: string;
  onPress: () => void;
}
const CustomButton = (props: IProps) => {
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

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
