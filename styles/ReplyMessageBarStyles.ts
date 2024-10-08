import { StyleSheet } from "react-native";

import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

import { colors } from '../constants/Colors';

export const ReplyMessageBarStyles = StyleSheet.create({
  container: { height: responsiveScreenHeight(7.14), flexDirection: 'row', backgroundColor: colors.backgroundColor3 },
  view1: { height: responsiveScreenWidth(7.14), width: responsiveScreenWidth(0.86), backgroundColor: colors.accentColor },
  view2: { flexDirection: 'column' },
  usernameText: {
    color: colors.accentColor2,
    paddingLeft: responsiveScreenWidth(1.43),
    paddingTop: responsiveScreenHeight(0.71),
    fontWeight: '600',
    fontSize: responsiveScreenFontSize(2.15),
  },
  messageText: { color: colors.foregroundColor2, paddingLeft: responsiveScreenWidth(1.43), paddingTop: responsiveScreenHeight(0.71) },
  view3: { flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: responsiveScreenWidth(1.43) },
});
