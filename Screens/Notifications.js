import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [fonts, setFonts] = useState(null);
  const [night, setNight] = useState(null);
  const appState = useSelector(state => state.appState.value);

  const findFonts = async () => {
    const result = await AsyncStorage.getItem('fonts');
    if (result !== null) {
      setFonts(JSON.parse(result));
    }
  };

  const findNight = async () => {
    const result = await AsyncStorage.getItem('night');
    if (result !== null) {
      setNight(JSON.parse(result));
    }
  };

  useEffect(() => {
    findFonts();
    findNight();
  }, [appState]);
  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: night ? '#272727' : '#fff'}}>
        <View
          style={{
            height: 55,
            justifyContent: 'center',
            paddingLeft: 20,
            justifyContent: 'center',
            backgroundColor: '#407BFF',
          }}>
          <Text
            style={{
              marginTop: 4,
              color: night ? '#272727' : '#fff',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 20,
            }}>
            Notifications
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: height - 140,
            }}>
            <Image
              style={{width: 160, height: 160}}
              source={require('../Assets/bell.png')}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: fonts,
                color: night ? '#d3d3d3' : '#808080',
              }}>
              We'll notify you here if there's an update.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Notifications;
