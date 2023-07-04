import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../helpers/screenConstants';
import WelcomeScreen from '../screens/Welcome';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'native-base';
const Stack = createNativeStackNavigator();
function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '80%',
      }}>
      <Text>Home Screen</Text>
    </View>
  );
}
const MainNavigation = () => {
  return (
    <Stack.Navigator
    // initialRouteName={Screens.login}
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name={Screens.login} component={WelcomeScreen} /> */}
    </Stack.Navigator>
  );
};

export default MainNavigation;
