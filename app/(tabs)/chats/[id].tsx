import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { Bubble, GiftedChat, IMessage, InputToolbar, Send, SystemMessage } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import messageData from '../../../assets/data/messages.json';
import ChatMessageBox from '../../../components/ChatMessageBox';
import ReplyMessageBar from '../../../components/ReplyMessageBar';
import { colors } from '../../../constants/Colors';
import { idStyles } from '../../../styles/idStyles';

const ChatsId = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();
  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);

  useEffect(() => {
    setMessages([
      ...messageData.map((message) => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.from ? 'You' : 'Bob',
          },
        };
      }),
      {
        _id: 0,
        system: true,
        text: 'All your base are belong to us',
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Bot',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any[]) => GiftedChat.append(previousMessages, messages));
  }, []);

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: colors.backgroundColor1 }}
        renderActions={() => (
          <View style={idStyles.renderInputToolbar}>
            <Ionicons name="add" color={colors.accentColor} size={28} />
          </View>
        )}
      />
    );
  };

  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

  return (
    <ImageBackground
      source={require('../../../assets/images/pattern.png')}
      style={[idStyles.ImageBackground, { marginBottom: insets.bottom, }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        onInputTextChanged={setText}
        user={{
          _id: 1,
        }}
        renderSystemMessage={(props) => (
          <SystemMessage {...props} textStyle={{ color: colors.foregroundColor2 }} />
        )}
        renderAvatar={null}
        maxComposerHeight={100}
        textInputProps={idStyles.composer}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{ right: { color: colors.foregroundColor1, }, }}
              wrapperStyle={{ 
                left: { backgroundColor: colors.backgroundColor1, }, 
                right: { backgroundColor: colors.lightGreen, }, 
              }}
            />
          );
        }}
        renderSend={(props) => (
          <View
            style={idStyles.renderSend}>
            {text === '' && (
              <>
                <Ionicons name="camera-outline" color={colors.accentColor} size={28} />
                <Ionicons name="mic-outline" color={colors.accentColor} size={28} />
              </>
            )}
            {text !== '' && (
              <Send
                {...props}
                containerStyle={{
                  justifyContent: 'center',
                }}>
                <Ionicons name="send" color={colors.accentColor} size={28} />
              </Send>
            )}
          </View>
        )}
        renderInputToolbar={renderInputToolbar}
        renderChatFooter={() => (
          <ReplyMessageBar clearReply={() => setReplyMessage(null)} message={replyMessage} />
        )}
        onLongPress={(context, message) => setReplyMessage(message)}
        renderMessage={(props) => (
          <ChatMessageBox
            {...props}
            setReplyOnSwipeOpen={setReplyMessage}
            updateRowRef={updateRowRef}
          />
        )}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </ImageBackground>
  );
};

export default ChatsId;
