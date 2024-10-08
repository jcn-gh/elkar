import React, { FC, Fragment, PropsWithChildren, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { colors } from '../constants/Colors';
import { defaultStyles } from '../styles/Styles';
import { swipeableStyles } from '../styles/swipeableStyles';

export const AppleStyleSwipeableRow: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const pressHandler = () => {
      close();
      window.alert(text);
    };

    return (
      <Animated.View style={[defaultStyles.flexFill, { transform: [{ translateX: trans }] }]}>
        <RectButton style={[swipeableStyles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <Ionicons
            name={text === 'More' ? 'ellipsis-horizontal' : 'archive'}
            size={24}
            color={colors.foregroundInverseColor}
            style={defaultStyles.pt10}
          />
          <Text style={swipeableStyles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>) => (
    <View style={defaultStyles.renderRightActions}>
      {['More', 'Archive'].map((text) => (
        <Fragment key={text}>
          {renderRightAction(text, text === 'More' ? colors.foregroundColor3 : colors.muted, text === 'More' ? 192 : 128, progress)}
        </Fragment>
      ))}
    </View>
  );

  const swipeableRow = useRef<Swipeable>(null);

  const close = () => {
    swipeableRow.current?.close();
  };

  return (
    <Swipeable
      ref={swipeableRow}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightActions}
      onSwipeableOpen={(direction) => {
        console.log('info', `Opening swipeable from the ${direction}`);
      }}
      onSwipeableClose={(direction) => {
        console.log('info', `Closing swipeable to the ${direction}`);
      }}>
      {children}
    </Swipeable>
  );
};
