import { StyleSheet } from "react-native";

import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

import { colors } from '../constants/Colors';

export const phoneStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: responsiveScreenWidth(2.86),
    backgroundColor: colors.backgroundColor1,
    gap: responsiveScreenWidth(2.86),
  },
  legal: {
    fontSize: responsiveScreenFontSize(2),
    textAlign: 'center',
    color: colors.foregroundColor1,
  },
  button: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.accentColor,
    fontSize: responsiveScreenFontSize(1.75),
  },
  codeFieldRoot: {
    marginTop: responsiveScreenHeight(2.86),
    width: responsiveScreenWidth(37.14),
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: responsiveScreenWidth(0.57),
  },
  cellRoot: {
    width: responsiveScreenWidth(5.71),
    height: responsiveScreenHeight(5.71),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.backgroundColor3,
    borderBottomWidth: responsiveScreenHeight(0.14),
  },
  cellText: {
    color: colors.foregroundColor1,
    fontSize: responsiveScreenFontSize(5.15),
    textAlign: 'center',
  },
  focusCell: {
    paddingBottom: responsiveScreenHeight(0.6),
    borderBottomColor: colors.foregroundColor1,
    borderBottomWidth: responsiveScreenHeight(0.3),
  },
});
