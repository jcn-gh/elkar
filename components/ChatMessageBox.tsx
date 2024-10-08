import React from 'react';
import { Animated, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { IMessage, Message, MessageProps } from 'react-native-gifted-chat';
import { isSameDay, isSameUser } from 'react-native-gifted-chat/lib/utils';

import { colors } from '../constants/Colors';
import { chatMessageStyles } from '../styles/chatMessageStyles';

type ChatMessageBoxProps = {
  setReplyOnSwipeOpen: (message: IMessage) => void;
  updateRowRef: (ref: any) => void;
} & MessageProps<IMessage>;

const ChatMessageBox = ({ setReplyOnSwipeOpen, updateRowRef, ...props }: ChatMessageBoxProps) => {
  const isNextMyMessage =
    props.currentMessage &&
    props.nextMessage &&
    isSameUser(props.currentMessage, props.nextMessage) &&
    isSameDay(props.currentMessage, props.nextMessage);

  const renderRightAction = (progressAnimatedValue: Animated.AnimatedInterpolation<any>) => {
    const size = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 100],
      outputRange: [0, 1, 1],
    });
    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 12, 20],
    });

    return (
      <Animated.View
        style={[
          chatMessageStyles.container,
          { transform: [{ scale: size }, { translateX: trans }] },
          isNextMyMessage ? chatMessageStyles.defaultBottomOffset : chatMessageStyles.bottomOffsetNext,
          props.position === 'right' && chatMessageStyles.leftOffsetValue,
        ]}>
        <View style={chatMessageStyles.replyImageWrapper}>
          <MaterialCommunityIcons name="reply-circle" size={26} color={colors.foregroundColor2} />
        </View>
      </Animated.View>
    );
  };

  const onSwipeOpenAction = () => {
    if (props.currentMessage) {
      setReplyOnSwipeOpen({ ...props.currentMessage });
    }
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={updateRowRef}
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightAction}
        onSwipeableWillOpen={onSwipeOpenAction}>
        <Message {...props} />
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default ChatMessageBox;
