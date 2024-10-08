import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

import { colors } from "../constants/Colors";

interface OTPComponents {
  mainContainer: ViewStyle;
  contentContainer: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  spacer: ViewStyle;
  subtitle: TextStyle;
  highlight: TextStyle;
  otpContainer: ViewStyle;
  inputContainer: ViewStyle;
  otpInput: TextStyle;
  feedbackContainer: ViewStyle;
  feedbackText: TextStyle;
  resendOtp: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  footer: ViewStyle;
  footerText: TextStyle;
  signIn: TextStyle;
  spacerHorizontal: ViewStyle;
  spacerHorizontalSmall: ViewStyle;
}

export const OTPStyledComponents: OTPComponents = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: colors.backgroundColor1,
    padding: 32,
    borderBottomRightRadius: responsiveScreenHeight(1.7),
    borderTopRightRadius: responsiveScreenHeight(1.7),
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: responsiveScreenFontSize(3.4),
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontWeight: "700",
    color: colors.textColor,
  },
  spacer: {
    height: 16,
  },
  subtitle: {
    flex: 1,
    alignItems: "center",
    fontSize: responsiveScreenFontSize(2),
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: colors.textColor,
  },
  highlight: {
    fontWeight: "700",
  },
  otpContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsiveScreenHeight(3.43),
  },
  inputContainer: {
    width: "12%",
    borderBottomWidth: responsiveScreenHeight(0.3),
    borderBottomColor: colors.borderColor,
  },
  otpInput: {
    width: "100%",
    backgroundColor: colors.overlayColor,
    height: "100%",
    fontSize: responsiveScreenFontSize(2),
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: colors.textColor,
    textAlign: "center",
    paddingTop: responsiveScreenHeight(1.15),
    paddingBottom: responsiveScreenHeight(1.15),
    paddingRight: responsiveScreenWidth(1.71),
    paddingLeft: responsiveScreenWidth(1.71),
  },
  feedbackContainer: {
    marginTop: responsiveScreenHeight(4.57),
  },
  feedbackText: {
    flex: 1,
    alignItems: "center",
    fontSize: responsiveScreenFontSize(2),
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: colors.textColor,
  },
  resendOtp: {
    color: colors.accentColor,
    fontWeight: "700",
  },
  buttonContainer: {
    marginTop: responsiveScreenHeight(4.57),
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.accentColor,
    color: colors.white,
    paddingTop: responsiveScreenHeight(1.7),
    paddingBottom: responsiveScreenHeight(1.7),
    paddingRight: responsiveScreenWidth(3.43),
    paddingLeft: responsiveScreenWidth(3.43),
    borderRadius: responsiveScreenWidth(0.57),
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveScreenHeight(4),
  },
  footerText: {
    fontSize: responsiveScreenFontSize(2),
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: colors.textColor,
  },
  signIn: {
    color: colors.accentColor,
    fontWeight: "700",
  },
  spacerHorizontal: {
    width: responsiveScreenWidth(1.14),
  },
  spacerHorizontalSmall: {
    width: responsiveScreenWidth(0.57),
  },
});