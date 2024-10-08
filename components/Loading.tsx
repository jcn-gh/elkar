import React, { FC, useEffect, useRef } from 'react';
import { Animated, Easing, TextStyle, View } from 'react-native';

import { colors } from '../constants/Colors';
import { LoadingStyles } from '../styles/LoadingStyles';

const FadingText: FC<{ text?: string; style?: TextStyle }> = ({ text = 'Loading...', style }) => {
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateColor = (toValue: number) => Animated.timing(colorAnim, { toValue, duration: 2090, easing: Easing.linear, useNativeDriver: false });

    Animated.loop(Animated.sequence([animateColor(1), animateColor(0)])).start();
  }, []);

  const interpolatedColor = colorAnim.interpolate({ inputRange: [0, 1], outputRange: [colors.accentColor2, colors.glassColor] });

  return (
    <View style={LoadingStyles.fadingContainer}>
      <Animated.Text style={[LoadingStyles.fadingText, style, { color: interpolatedColor }]}>
        {text}
      </Animated.Text>
    </View>
  );
};

const Loading: FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <View>
    <FadingText text={text} />
  </View>
);

export default Loading;