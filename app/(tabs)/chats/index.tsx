import React from 'react';
import { FlatList, ScrollView } from 'react-native';

import chats from '../../../assets/data/chats.json';
import ChatRow from '../../../components/ChatRow';
import { Separator } from '../../../components/Separator';
import { defaultStyles } from '../../../styles/Styles';

const Chats = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={defaultStyles.chatContentContainerStyle}>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatRow {...item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Separator}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default Chats;
