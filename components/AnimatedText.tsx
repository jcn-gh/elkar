import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, TextInput, View } from "react-native";

import { defaultStyles } from '../styles/Styles';

const VideoScreen = () => {
  const examples = useMemo(() => ["Trekking..", "Nightout..", "Birthday..", "Farewell.."], []);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const animatableValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const updateIndex = () => setIndex(prevIndex => (prevIndex + 1) % examples.length);
    const startFadeAnimation = () => {
      animatableValue.setValue(0);
      Animated.timing(animatableValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(({ finished }) => {
        if (finished) {
          updateIndex();
          startFadeAnimation();
        } else animatableValue.setValue(0.5);
      });
    };
    startFadeAnimation();
    return () => animatableValue.stopAnimation();
  }, [examples, setIndex]);

  const onPressButton = useCallback(() => animatableValue.stopAnimation(), []);

  const textOpacity = animatableValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  });

  return (
    <View style={defaultStyles.animatedTextContainer}>
      <Animated.View style={{ opacity: textOpacity }}>
        <TextInput
          autoFocus
          style={defaultStyles.animatedText}
          onBlur={onPressButton}
          underlineColorAndroid="transparent"
          placeholder={examples[index]}
          onChangeText={setText}
          value={text}
        />
      </Animated.View>
    </View>
  );
};

export default VideoScreen;