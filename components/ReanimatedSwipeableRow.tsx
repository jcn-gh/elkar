import React from 'react';
import { Text, View } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { ReanimatedSwipeableRowProps } from '../constants/Interfaces';
import { ReanimatedSwipeableRowStyles } from '../styles/ReanimatedSwipeableRowStyles';


const SwipeAction = React.memo(({ progress, dragX, direction }: 
  { 
    progress: SharedValue<number>; 
    dragX: SharedValue<number>; 
    direction: 'left' | 'right' 
  }) => {
  const translateX = useAnimatedStyle(() => ({
    transform: [{ translateX: direction === 'left' ? dragX.value - 50 : dragX.value + 50 }],
  }), [direction, dragX]);

  return (
    <Animated.View style={[ReanimatedSwipeableRowStyles.action, translateX]}>
      <Text style={direction === 'left' ? ReanimatedSwipeableRowStyles.leftAction : ReanimatedSwipeableRowStyles.rightAction}>Text</Text>
    </Animated.View>
  );
}, (prevProps, nextProps) => prevProps.direction === nextProps.direction && prevProps.dragX.value === nextProps.dragX.value && prevProps.progress.value === nextProps.progress.value);

const ReanimatedSwipeableRow = (props: ReanimatedSwipeableRowProps) => {
  const dragLeft = useSharedValue(0);
  const dragRight = useSharedValue(0);

  const renderActions = (progress: SharedValue<number>, drag: SharedValue<number>, direction: 'left' | 'right') => (
    <SwipeAction progress={progress} dragX={drag} direction={direction} />
  );

  return (
    <GestureHandlerRootView>
      <View style={ReanimatedSwipeableRowStyles.separator} />
      <ReanimatedSwipeable
        containerStyle={ReanimatedSwipeableRowStyles.swipeable}
        friction={2}
        leftThreshold={80}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderLeftActions={(progress) => renderActions(progress, dragLeft, 'left')}
        renderRightActions={(progress) => renderActions(progress, dragRight, 'right')}
      >
        <Text>[Reanimated] Swipe me!</Text>
      </ReanimatedSwipeable>
      <View style={ReanimatedSwipeableRowStyles.separator} />
    </GestureHandlerRootView>
  );
};

export default ReanimatedSwipeableRow;