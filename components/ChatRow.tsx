import React, { FC, memo, useCallback, useMemo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { format } from 'date-fns';
import { Href, router } from 'expo-router';
import PropTypes from 'prop-types';

import { colors } from '../constants/Colors';
import { truncateMessage } from '../constants/functions';
import { ChatRowProps } from '../constants/Interfaces';
import { ChatRowStyles } from '../styles/ChatRowStyles';
import { defaultStyles } from '../styles/Styles';
import { AppleStyleSwipeableRow } from './AppleStyleSwipeableRow';

const placeholderImage = require('../assets/images/placeholder-icon.png');
const DATE_FORMAT = 'MM.dd.yy';

const ChatRow: FC<ChatRowProps> = memo(({ id, from, date, img, msg, read, unreadCount }: ChatRowProps): JSX.Element => {
  const handleChatRowPress = useCallback(() => {
    router.replace(`/(tabs)/chats/${id}` as Href);
  }, [id]);

  const truncatedMsg = useMemo(() => truncateMessage(msg, 40), [msg]);

  return (
    <AppleStyleSwipeableRow>
      <Pressable
        key={id}
        style={ChatRowStyles.container}
        android_ripple={{ color: colors.foregroundColor3 }}
        onPress={handleChatRowPress}
      >
        <Image source={img ? { uri: img } : placeholderImage} style={ChatRowStyles.image} />
        <View style={defaultStyles.flexFill}>
          <Text style={ChatRowStyles.fromText}>{from}</Text>
          <Text style={ChatRowStyles.msgText}>{truncatedMsg}</Text>
        </View>
        <Text style={ChatRowStyles.dateText}>{format(new Date(date), DATE_FORMAT)}</Text>
      </Pressable>
    </AppleStyleSwipeableRow>
  );
});

ChatRow.propTypes = {
  id: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  read: PropTypes.bool.isRequired,
  unreadCount: PropTypes.number.isRequired,
};

export default ChatRow;
