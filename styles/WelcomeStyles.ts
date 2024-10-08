import { StyleSheet } from "react-native";

import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

import { colors } from '../constants/Colors';

export const WelcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveScreenWidth(2.86),
    backgroundColor: colors.backgroundColor1,
  },
  welcome: {
    width: '100%',
    height: responsiveScreenHeight(42.86),
    borderRadius: responsiveScreenWidth(8.57),
    marginBottom: responsiveScreenHeight(11.4),
  },
  headline: {
    color: colors.foregroundColor1,
    fontSize: responsiveScreenFontSize(3.4),
    fontWeight: 'bold',
    marginVertical: responsiveScreenHeight(2.86),
  },
  description: {
    fontSize: responsiveScreenFontSize(2),
    textAlign: 'center',
    color: colors.foregroundColor3,
  },
  link: {
    color: colors.accentColor,
  },
  button: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.accentColor2,
    fontSize: responsiveScreenFontSize(3.15),
    fontWeight: '500',
  },
  mb80: { marginBottom: responsiveScreenHeight(11.4), },
  fb: { fontWeight: '900', }
});
