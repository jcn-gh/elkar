import { useCallback } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Href, Stack, useRouter } from 'expo-router';

import { colors } from '../../../constants/Colors';
import { chatsStyles } from '../../../styles/chatsStyles';

const indexHeaderLeft = () => {
  return (
    <Pressable>
      <Ionicons
        name="ellipsis-horizontal-circle-outline"
        color={colors.accentColor}
        size={30}
      />
    </Pressable>
  );
};

const IndexHeaderRight = () => {
  const router = useRouter();
  const handleNewChatPress = useCallback(() => {
    router.push('/(modals)/new-chat' as Href);
  }, [router]);
  return (
    <View style={chatsStyles.indexHeaderRight}>
      <Pressable>
        <Ionicons name="camera-outline" color={colors.accentColor} size={30} />
      </Pressable>
      <Pressable onPress={handleNewChatPress}>
        <Ionicons name="add-circle" color={colors.accentColor} size={30} />
      </Pressable>
    </View>
  );
};

const idHeaderTitle = () => {
  return (
    <View
      style={chatsStyles.idHeaderTitle}>
      <Image
        source={{
          uri: 'https://pbs.twimg.com/profile_images/1564203599747600385/f6Lvcpcu_400x400.jpg',
        }}
        style={chatsStyles.idHeaderTitleImage}
      />
      <Text style={chatsStyles.idHeaderTitleText}>Simon Grimm</Text>
    </View>
  );
};

const idHeaderRight = () => {
  return (
    <View style={chatsStyles.idHeaderRight}>
      <Pressable>
        <Ionicons name="videocam-outline" color={colors.accentColor} size={30} />
      </Pressable>
      <Pressable>
        <Ionicons name="call-outline" color={colors.accentColor} size={30} />
      </Pressable>
    </View>
  );
};
const ChatsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Chats',
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerLeft: indexHeaderLeft,
          headerRight: IndexHeaderRight,
          headerStyle: { backgroundColor: colors.backgroundColor1, },
          headerSearchBarOptions: {
            placeholder: 'Search',
          },
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerTitle: idHeaderTitle,
          headerRight: idHeaderRight,
          headerStyle: { backgroundColor: colors.backgroundColor1, },
        }}
      />
    </Stack>
  );
};

export default ChatsLayout;
