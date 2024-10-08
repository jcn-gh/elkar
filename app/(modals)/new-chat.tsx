import React, { useMemo } from 'react';
import { Image, Text, View } from 'react-native';

import { AlphabetList } from 'react-native-section-alphabet-list';

import contacts from '../../assets/data/contacts.json';
import { Separator } from '../../components/Separator';
import { newChatStyles } from '../../styles/newChatStyles';

const NewChat = () => {
  const data = useMemo(
    () =>
      contacts.map(({ first_name, last_name, img, desc }, index) => ({
        value: `${first_name} ${last_name}`,
        name: `${first_name} ${last_name}`,
        img,
        desc: desc.length > 40 ? `${desc.substring(0, 40)}...` : desc,
        key: `${first_name} ${last_name}-${index}`,
      })),
    [contacts]
  );

  return (
    <View style={newChatStyles.view}>
      <AlphabetList
        data={data}
        stickySectionHeadersEnabled
        indexLetterStyle={newChatStyles.indexLetterStyle}
        indexContainerStyle={newChatStyles.indexContainerStyle}
        renderCustomItem={(item: any) => (
          <>
            <View style={newChatStyles.listItemContainer}>
              <Image source={{ uri: item.img }} style={newChatStyles.listItemImage} />
              <View>
                <Text style={newChatStyles.text1}>
                  {item.value}
                </Text>
                <Text style={newChatStyles.text2}>
                  {item.desc.length > 40 ? `${item.desc.substring(0, 40)}...` : item.desc}
                </Text>
              </View>
            </View>
            <Separator />
          </>
        )}
        renderCustomSectionHeader={(section) => (
          <View style={newChatStyles.sectionHeaderContainer}>
            <Text style={newChatStyles.text2}>{section.title}</Text>
          </View>
        )}
        style={newChatStyles.ml14}
      />
    </View>
  );
};

export default NewChat;
