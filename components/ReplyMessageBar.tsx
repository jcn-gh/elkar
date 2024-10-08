import { Pressable, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { IMessage } from 'react-native-gifted-chat';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { colors } from '../constants/Colors';
import { ReplyMessageBarStyles } from '../styles/ReplyMessageBarStyles';

type ReplyMessageBarProps = {
  clearReply: () => void;
  message: IMessage | null;
};

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
  if (!message) return null;

  const truncatedText = message.text.length > 40 ? `${message.text.substring(0, 40)}...` : message.text;

  return (
    <Animated.View style={ReplyMessageBarStyles.container} entering={FadeInDown} exiting={FadeOutDown}>
      <View style={ReplyMessageBarStyles.view1}></View>
      <View style={ReplyMessageBarStyles.view2}>
        <Text style={ReplyMessageBarStyles.usernameText}>{message.user.name}</Text>
        <Text style={ReplyMessageBarStyles.messageText}>{truncatedText}</Text>
      </View>
      <View style={ReplyMessageBarStyles.view3}>
        <Pressable onPress={clearReply}>
          <Ionicons name="close-circle-outline" color={colors.accentColor} size={28} />
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default ReplyMessageBar;
