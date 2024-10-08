import React from 'react';
import { Animated, Text, View } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { colors } from '../constants/Colors';
import { RightActionProps, RightActionsProps } from '../constants/Interfaces';
import { defaultStyles } from '../styles/Styles';
import { swipeableStyles } from '../styles/swipeableStyles';

const RightAction = ({ text, color, x, progress, onPress }: RightActionProps) => {
  const trans = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value + 50 }],
  }));

  return (
    <Animated.View style={[defaultStyles.flexFill, trans]}>
      <RectButton style={[swipeableStyles.rightAction, { backgroundColor: colors.delete }]} onPress={onPress}>
        <Text style={swipeableStyles.actionText}>{text}</Text>
      </RectButton>
    </Animated.View>
  );
};

const RightActions = ({ progress, dragAnimatedValue }: RightActionsProps) => {
  const defaultDragAnimatedValue = useSharedValue(300);

  return (
    <View style={swipeableStyles.swipeableView}>
      <RightAction text='Delete' color={colors.delete} x={dragAnimatedValue || defaultDragAnimatedValue} progress={progress} onPress={close} />
    </View>
  );
};

const SwipeableRow: React.FC<{
  onDelete: () => void;
  children: React.ReactNode;
}> = ({ onDelete, children }) => {
  const rightActionsProgress = useSharedValue<number>(0);

  const close = React.useCallback(() => {
    onDelete();
  }, [onDelete]);

  const onSwipeableOpen = React.useCallback(close, []);

  return (
    <ReanimatedSwipeable
      enableTrackpadTwoFingerGesture
      friction={1.4}
      overshootRight={false}
      rightThreshold={140}
      renderRightActions={() => (
        <RightActions progress={rightActionsProgress} />
      )}
      onSwipeableOpen={onSwipeableOpen}
    >
      {children}
    </ReanimatedSwipeable>
  );
};

export default SwipeableRow;
