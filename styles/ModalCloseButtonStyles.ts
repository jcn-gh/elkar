import { StyleSheet } from "react-native";

import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

export const ModalCloseButtonStyles = StyleSheet.create({
  closeMainCon: {
    height: responsiveScreenHeight(3.43),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalCloseIcon: {
    width: responsiveScreenWidth(3.43),
    height: responsiveScreenHeight(3.43),
  },
});
