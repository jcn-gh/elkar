import { StyleSheet } from "react-native";

import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

import { colors } from '../constants/Colors';

export const idStyles = StyleSheet.create({
  renderInputToolbar: { 
    height: responsiveScreenHeight(6.29), 
    justifyContent: 'center', 
    alignItems: 'center', 
    left: responsiveScreenWidth(0.71) 
  },
  ImageBackground: { 
    flex: 1, 
    backgroundColor: colors.backgroundColor1, 
  },
  composer: {
    backgroundColor: colors.backgroundColor1,
    borderRadius: responsiveScreenWidth(2.57),
    borderWidth: responsiveScreenWidth(0.14),
    borderColor: colors.backgroundColor3,
    paddingHorizontal: responsiveScreenWidth(1.43),
    paddingTop: responsiveScreenHeight(1.15),
    fontSize: responsiveScreenFontSize(2.3),
    marginVertical: 4,
  },
  renderSend: {
    height: responsiveScreenHeight(6.29),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsiveScreenWidth(2),
    paddingHorizontal: responsiveScreenWidth(2),
  },
});
