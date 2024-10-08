import { StyleSheet } from "react-native";

import { responsiveScreenFontSize, responsiveScreenHeight } from "react-native-responsive-dimensions";
import { colors } from '../constants/Colors';

export const settingsStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundColor1 },
  renderItemText: { fontSize: responsiveScreenFontSize(1.75), flex: 1 },
  logOutText:{
    color: colors.accentColor,
    fontSize: responsiveScreenFontSize(1.75),
    textAlign: 'center',
    paddingVertical: responsiveScreenHeight(2),
  },
});
