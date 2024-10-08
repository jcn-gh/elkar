import { StyleSheet } from "react-native";

import { responsiveScreenFontSize, responsiveScreenWidth } from "react-native-responsive-dimensions";

import { colors } from '../constants/Colors';

export const swipeableStyles = StyleSheet.create({
  swipeableView:{
    width: responsiveScreenWidth(42.86),
    flexDirection: 'row',
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: colors.white,
    fontSize: responsiveScreenFontSize(2.3),
    backgroundColor: 'transparent',
    padding: responsiveScreenWidth(1.43),
    alignSelf: 'flex-start',
  },
  rightAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
