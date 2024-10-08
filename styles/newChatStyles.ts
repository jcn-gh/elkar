import { StyleSheet } from "react-native";

import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

import { colors } from '../constants/Colors';

export const newChatStyles = StyleSheet.create({
  view: { flex: 1, paddingTop: responsiveScreenHeight(15.71), backgroundColor: colors.backgroundColor1 },
  indexLetterStyle: { color: colors.accentColor, fontSize: responsiveScreenFontSize(1.7), },
  indexContainerStyle: { width: responsiveScreenWidth(3.43), backgroundColor: colors.backgroundColor1, },
  text1: { color: colors.foregroundColor1, fontSize: responsiveScreenFontSize(2) },
  text2: { color: colors.foregroundColor3, fontSize: responsiveScreenFontSize(1.7) },
  ml14: { marginLeft: responsiveScreenWidth(2) },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveScreenWidth(1.43),
    height: responsiveScreenHeight(7.14),
    paddingHorizontal: responsiveScreenWidth(2),
    backgroundColor: colors.backgroundColor1,
  },

  listItemImage: {
    width: responsiveScreenWidth(4.29),
    height: responsiveScreenHeight(4.29),
    borderRadius: responsiveScreenWidth(2.14),
  },

  sectionHeaderContainer: {
    height: responsiveScreenHeight(4.29),
    backgroundColor: colors.backgroundColor1,
    justifyContent: 'center',
    paddingHorizontal: responsiveScreenWidth(2),
  },
});
