import React, { FC } from "react";
import { Text, View } from "react-native";

import { CustomErrorProps } from '../constants/Interfaces';

export const CustomError: FC<CustomErrorProps> = ({ message }) => (
  <View>
    <Text>{message}</Text>
  </View>
);
