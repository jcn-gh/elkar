import React, { useRef } from 'react';
import { Animated, I18nManager, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

import { colors } from '../constants/Colors';
import { ReanimatedSwipeableRowProps } from '../constants/Interfaces';
import { AppleStyleSwipeableRowStyles } from '../styles/AppleStyleSwipeableRowStyles';
import { swipeableStyles } from '../styles/swipeableStyles';

const LeftAction = ({ drag, swipeableRef }: {
  drag: SharedValue<number>,
  swipeableRef: React.RefObject<SwipeableMethods>
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(interpolate(drag.value, [0, 50, 100, 101], [-20, 0, 0, 1], Extrapolation.CLAMP)) }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <RectButton
        style={AppleStyleSwipeableRowStyles.rectButton}
        onPress={() => swipeableRef.current!.close()}
      >
        <View accessible accessibilityRole="button">
          <Animated.Text style={AppleStyleSwipeableRowStyles.leftAction}>
            Archive
          </Animated.Text>
        </View>
      </RectButton>
    </Animated.View>
  );
}

const renderLeftActions = (
  progress: any,
  translation: SharedValue<number>,
  swipeableRef: React.RefObject<SwipeableMethods>
) => <LeftAction drag={translation} swipeableRef={swipeableRef} />;

function RightAction(
  text: string,
  color: string,
  drag: number,
  progress: SharedValue<number>,
) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: interpolate(
        drag,
        [0, 1],
        [drag, 1],
        Extrapolation.CLAMP
      ),
    }],
  }));

  const pressHandler = () => {
    close();
  };

  return (
    <Reanimated.View style={animatedStyle}>
      <RectButton style={[swipeableStyles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
        <View accessible accessibilityRole="button">
          <Ionicons
            name={text === 'More' ? 'ellipsis-horizontal' : 'archive'}
            size={24}
            color={colors.white}
            style={{ paddingTop: responsiveScreenHeight(1.4) }}
          />
          <Text style={swipeableStyles.actionText}>{text}</Text>
        </View>
      </RectButton>
    </Reanimated.View>
  );
}

const renderRightActions = (
  drag: SharedValue<number>, progress: SharedValue<number>, swipeableRow: React.RefObject<SwipeableMethods>,
) => (
  <View style={{ width: 192, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', }}>
    {RightAction('More', colors.lightGray, 192, progress)}
    {RightAction('Archive', colors.muted, 128, progress)}
    {RightAction('Delete', colors.delete, 300, progress)}
  </View>
);

export default function AppleStyleReanimatedSwipeableRow({ children }: Readonly<ReanimatedSwipeableRowProps>) {
  const swipeableRow = useRef<SwipeableMethods>(null);

  return (
    <GestureHandlerRootView>
      <View style={AppleStyleSwipeableRowStyles.separator} />

      <ReanimatedSwipeable
        ref={swipeableRow}
        containerStyle={AppleStyleSwipeableRowStyles.swipeable}
        friction={2}
        leftThreshold={80}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderLeftActions={(drag: any, progress: SharedValue<number>) =>
          renderLeftActions(drag, progress, swipeableRow)
        }
        renderRightActions={(drag: SharedValue<number>, progress: SharedValue<number>) =>
          renderRightActions(drag, progress, swipeableRow)
        }>
        <Text>[Reanimated Apple style swipeable] Swipe me!</Text>
      </ReanimatedSwipeable>

      <View style={AppleStyleSwipeableRowStyles.separator} />
    </GestureHandlerRootView>
  );
}
