import { memo, useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { IMessage, Message, MessageProps } from 'react-native-gifted-chat';
import { isSameDay, isSameUser } from 'react-native-gifted-chat/lib/utils';
import Reanimated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { colors } from '../constants/Colors';
import { ChatMessageBoxStyles } from '../styles/ChatMessageBoxStyles';

const useAnimatedStyleHook = (progress: SharedValue<number>) => {
  return useAnimatedStyle(() => {
    const size = interpolate(progress.value, [0, 1], [0, 1]);
    const trans = interpolate(progress.value, [0, 1], [12, 20]);
    return {
      transform: [{ scale: size }, { translateX: trans }]
    };
  });
};

const RightAction = memo(({
  progressAnimatedValue,
  currentMessage,
  nextMessage,
  position
}: {
  progressAnimatedValue: SharedValue<number>;
  currentMessage: IMessage;
  nextMessage: IMessage;
  position: 'right' | 'left';
}) => {
  const animatedStyle = useAnimatedStyleHook(progressAnimatedValue);
  const isNextMyMessage = useMemo(() => currentMessage && nextMessage && isSameUser(currentMessage, nextMessage) && isSameDay(currentMessage, nextMessage), [currentMessage, nextMessage]);

  return (
    <Reanimated.View style={[
      ChatMessageBoxStyles.container,
      animatedStyle,
      isNextMyMessage ? ChatMessageBoxStyles.defaultBottomOffset : ChatMessageBoxStyles.bottomOffsetNext,
      position === 'right' && ChatMessageBoxStyles.leftOffsetValue
    ]}>
      <View style={ChatMessageBoxStyles.replyImageWrapper}>
        <MaterialCommunityIcons name="reply-circle" size={26} color={colors.gray} />
      </View>
    </Reanimated.View>
  );
});

type ChatMessageBoxProps = {
  setReplyOnSwipeOpen: (message: IMessage) => void;
  updateRowRef: (ref: any) => void;
} & MessageProps<IMessage>;

const ChatMessageBox = ({ setReplyOnSwipeOpen, ...props }: ChatMessageBoxProps) => {
  const rowRef = useRef(null);

  const renderRightActions = useCallback((progress: SharedValue<number>) =>
    <RightAction
      position='right'
      progressAnimatedValue={progress}
      currentMessage={props.currentMessage}
      nextMessage={props.nextMessage || {} as IMessage}
    />, [props.currentMessage, props.nextMessage]);

  const onSwipeOpenAction = useCallback(() => {
    if (props.currentMessage) {
      setReplyOnSwipeOpen({ ...props.currentMessage });
    }
  }, [props.currentMessage, setReplyOnSwipeOpen]);

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        ref={rowRef}
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={onSwipeOpenAction}>
        <Message {...props} />
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};

export default ChatMessageBox;