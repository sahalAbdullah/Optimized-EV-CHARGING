import React, {useState, useEffect, useRef} from 'react';
import {
  Button,
  Actionsheet,
  HStack,
  Pressable,
  Text,
  View,
  VStack,
} from 'native-base';
import {firebase} from '@react-native-firebase/database';

export default function ActionAccept(props: any) {
  const user = 'UH9XyXrLmscRcOZ7lxPdS3N9SYC2';
  const [open, setOpen] = useState<boolean>(false);

  const initialRender = useRef(false);

  const [result, setResult] = useState<any>();

  // firebase
  //   .app()
  //   .database('https://react-native-course-cb023-default-rtdb.firebaseio.com')
  //   .ref(`/initiateRequest/${user}`)
  //   .on('value', snapshot => {
  //     setResult(snapshot.val());
  //   });
  useEffect(() => {
    console.log('Resultt: ', result);
    if (result && result?.response !== 'null') {
      console.log('Got result', result);
      setOpen(true);
      // props.loaderHandler();
    }
  }, [result]);

  const fetchResponse = () => {
    console.log('Fetching res');
    firebase
      .app()
      .database('https://react-native-course-cb023-default-rtdb.firebaseio.com')
      .ref(`/initiateRequest/${user}`)
      .on('value', snapshot => {
        if (initialRender.current) {
          console.log('Render: ', initialRender.current);
          console.log('Setting data');
          setResult(snapshot.val());
        } else {
          console.log('Setting to true');
          initialRender.current = true;
        }
      });
  };
  const acceptHandler = () => {
    setOpen(false);
    props.mapShow(result?.response?.station);
  };

  useEffect(() => {
    fetchResponse();
  }, []);
  return (
    <>
      <Actionsheet
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}>
        <Actionsheet.Content>
          <VStack>
            <View paddingLeft={6} paddingTop={4}>
              <Text>
                <Text style={{fontSize: 17}}>Station:</Text>
                <Text style={{color: 'blue', fontWeight: 'bold'}}>
                  {result?.response?.station === 'station1'
                    ? '  Allam Iqbal Town'
                    : null}
                  {result?.response?.station === 'station2'
                    ? '  Kalma Chow'
                    : null}
                  {result?.response?.station === 'station3'
                    ? '  Johar Town'
                    : null}
                </Text>
              </Text>
            </View>
            <View paddingLeft={6} paddingTop={4}>
              <Text>
                <Text style={{fontSize: 17}}>Cost:</Text>{' '}
                {result?.response?.value / 10000}
                <Text style={{color: 'blue', fontWeight: 'bold'}}> $</Text>
              </Text>
            </View>
            <View paddingLeft={6} paddingTop={4} paddingBottom={14}>
              <Text>
                <Text style={{fontSize: 17}}>Time: </Text>
                {result?.response?.another_value < 30
                  ? result?.response?.station === 'station1'
                    ? parseInt(result?.response?.another_value + props.time1)
                    : result?.response?.station === 'station2'
                    ? parseInt(result?.response?.another_value + props.time2)
                    : result?.response?.station === 'station3'
                    ? parseInt(result?.response?.another_value + props.time3)
                    : null
                  : result?.response?.another_value}{' '}
                <Text style={{color: 'blue', fontWeight: 'bold'}}>minutes</Text>
              </Text>
            </View>
            <HStack
              w={'100%'}
              justifyContent={'space-evenly'}
              alignItems={'center'}
              marginBottom={2}>
              <Pressable onPress={() => setOpen(false)}>
                {({isPressed}) => (
                  <View
                    style={{
                      width: 152,
                      height: 40,
                      padding: 10,
                      backgroundColor: '#ffcccb',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      opacity: isPressed ? 0.55 : 1,
                    }}>
                    <Text style={{color: '#f70d1a'}}>Decline</Text>
                  </View>
                )}
              </Pressable>
              <Pressable onPress={acceptHandler}>
                {({isPressed}) => (
                  <View
                    style={{
                      width: 152,
                      height: 40,
                      padding: 10,
                      backgroundColor: '#cde3fd',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      opacity: isPressed ? 0.55 : 1,
                    }}>
                    <Text style={{color: 'blue'}}>Accept</Text>
                  </View>
                )}
              </Pressable>
            </HStack>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
