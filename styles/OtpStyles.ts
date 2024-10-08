import { StyleSheet } from "react-native";

import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

import { colors } from '../constants/Colors';

export const OtpStyles = StyleSheet.create({
  flexFill: {flex: 1,},
  buttonMargin: {marginBottom: responsiveScreenHeight(2.85)},
  loadingText: {fontSize: responsiveScreenFontSize(1.75), padding: 10},
  container: {
    flex: 1,
    alignItems: 'center',
    padding: responsiveScreenWidth(2.86),
    justifyContent: "center",
    backgroundColor: colors.backgroundColor1,
    gap: responsiveScreenWidth(2.86),
  },
  description: {
    fontSize: responsiveScreenFontSize(2),
    color: colors.foregroundColor3,
  },
  legal: {
    fontSize: responsiveScreenFontSize(1.7),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.foregroundColor1,
  },
  link: {
    color: colors.accentColor,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor2,
    color: colors.foregroundColor3,
    padding: responsiveScreenWidth(1.43),
    borderRadius: responsiveScreenWidth(1.43),
  },
  enabled: {
    backgroundColor: colors.accentColor,
    fontWeight: '900',
    color: colors.black,
  },
  buttonText: {
    color: colors.foregroundColor3,
    fontSize: responsiveScreenFontSize(3.15),
    fontWeight: '500',
  },
  list: {
    backgroundColor: colors.backgroundColor1,
    width: '100%',
    borderRadius: responsiveScreenWidth(1.43),
    padding: responsiveScreenWidth(1.43),
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsiveScreenWidth(0.86),
    marginBottom: responsiveScreenHeight(1.4),
  },
  listItemText: {
    fontSize: responsiveScreenFontSize(1.75),
    color: colors.accentColor,
  },
  icon:{
    fontSize: responsiveScreenFontSize(2.85),
    color: colors.foregroundColor2,
  },
  input: {
    backgroundColor: colors.backgroundColor1,
    color: colors.foregroundColor1,
    width: '100%',
    fontSize: responsiveScreenFontSize(2.3),
    padding: responsiveScreenWidth(0.86),
    marginTop: responsiveScreenHeight(1.43),
  },
  loading: {
    zIndex: 10,
    backgroundColor: colors.backgroundColor1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
