import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { openLink } from '../constants/functions';
import { WelcomeStyles } from '../styles/WelcomeStyles';

const welcomeImage = require('../banner.png');

const WelcomeScreen = () => {
  return (
    <View style={WelcomeStyles.container}>
      <Image source={welcomeImage} style={[WelcomeStyles.welcome, WelcomeStyles.mb80]} resizeMode='contain' />
      <Text style={WelcomeStyles.headline}>Welcome to Elkar Chat</Text>
      <Text style={WelcomeStyles.description}>
        Read our{' '}
        <Text style={WelcomeStyles.link} onPress={() => openLink('https://en.wikipedia.org/wiki/Privacy_policy')}>
          Privacy Policy
        </Text>
        .
      </Text>
      <Text style={[WelcomeStyles.description, WelcomeStyles.mb80]}>
        Tap "<Text style={WelcomeStyles.fb}>Agree & Continue</Text>" to accept the {' '}
        <Text style={WelcomeStyles.link} onPress={() => openLink('https://en.wikipedia.org/wiki/Terms_of_service')}>
          Terms of Service
        </Text>
        .
      </Text>
      <Pressable style={WelcomeStyles.button} onPress={() => openLink('/otp')} accessible={true} aria-label="Agree and Continue Button">
        <Text style={WelcomeStyles.buttonText} accessible={true} aria-label="Agree and Continue">Agree & Continue</Text>
      </Pressable>
    </View>
  );
};

export default WelcomeScreen;
