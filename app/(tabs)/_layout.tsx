import React, { memo, useMemo } from 'react';

import { Tabs, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import TabScreen from '../../components/TabScreen';
import { colors } from '../../constants/Colors';
import { defaultStyles } from '../../styles/Styles';

const screenOptions = {
  tabBarStyle: defaultStyles.backgroundColor,
  tabBarActiveTintColor: colors.accentColor,
  tabBarInactiveTintColor: colors.foregroundColor3,
  headerStyle: defaultStyles.backgroundColor,
  headerShadowVisible: false,
};

const isSegmentsWithId = (segments: string[]): segments is [string, string, string] => {
  return segments.length > 2;
};

const TabsLayout = memo(() => {
  const segments = useSegments() || [];
  
  const isChatHidden = useMemo(() => isSegmentsWithId(segments) && segments[2] === '[id]', [segments]);
  const chatTabBarStyle = isChatHidden ? { display: 'none' } : { display: 'flex' };

  return (
    <GestureHandlerRootView style={defaultStyles.flexFill}>
      <Tabs screenOptions={screenOptions}>
        <TabScreen name="updates" title="Updates" iconName="update" />
        <TabScreen name="calls" title="Calls" iconName="phone" headerShown={false} />
        <TabScreen name="communities" title="Communities" iconName="people" />
        <TabScreen
          name="chats"
          title="Chats"
          iconName="chat"
          headerShown={false}
          tabBarStyle={chatTabBarStyle}
        />
        <TabScreen name="settings" title="Settings" iconName="settings" headerShown={false} />
      </Tabs>
    </GestureHandlerRootView>
  );
});

export default memo(TabsLayout);