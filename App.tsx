import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Text, View} from 'native-base';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider, Box, Pressable} from 'native-base';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {RootState} from './store/store';
import {useSelector, useDispatch} from 'react-redux';
import Logout from './src/assets/svg/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authToken} from './src/features/authentication/authentication';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const auth = useSelector((state: RootState) => state.authSlice.value);
  const dispatch = useDispatch();
  const pressHandler = () => {
    AsyncStorage.removeItem('token');
    dispatch(authToken(false));
  };
  if (!auth) {
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        {/* <Stack.Screen
          name="Car Information"
          component={Welcome}
          options={{
            headerRight: () => (
              <Pressable onPress={pressHandler}>
                {({isPressed}) => (
                  <View style={{opacity: isPressed ? 0.25 : 1}}>
                    <Logout width={30} height={25} />
                  </View>
                )}
              </Pressable>
            ),
          }}
        /> */}
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator initialRouteName="Car Information">
      <Stack.Screen
        name="Car Information"
        component={Welcome}
        options={{
          headerRight: () => (
            <Pressable onPress={pressHandler}>
              {({isPressed}) => (
                <View style={{opacity: isPressed ? 0.25 : 1}}>
                  <Logout width={30} height={25} />
                </View>
              )}
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <NativeBaseProvider>
          <AuthStack />
        </NativeBaseProvider>
      </Provider>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({});

export default App;
