import React, { FC, memo, ReactNode } from "react";
import { Text, TextStyle } from "react-native";

import { responsiveFontSize } from "react-native-responsive-dimensions";

import { COLORS } from "../styles/Styles";

type AppTextProps = {
  children: ReactNode;
  style?: TextStyle;
  size?: number;
  bold?: boolean;
  color?: string;
};

const AppText: FC<AppTextProps> = memo(({ children, style, size = 2, bold = false, color = COLORS.lightgray2 }) => (
  <Text style={{ color, fontWeight: bold ? "700" : "400", fontFamily: "OpenSans-Medium", fontSize: responsiveFontSize(size), ...style }}>
    {children}
  </Text>
));

export default AppText;
