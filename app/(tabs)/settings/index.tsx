import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useAuth } from '@clerk/clerk-expo';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

import SettingsList from '../../../components/SettingsList';
import { colors } from '../../../constants/Colors';
import { settingsStyles } from '../../../styles/settingsStyles';

const Settings = () => {
  const devices = [
    {
      name: 'Broadcast Lists',
      icon: 'megaphone',
      backgroundColor: colors.green,
    },
    {
      name: 'Starred Messages',
      icon: 'star',
      backgroundColor: colors.yellow,
    },
    {
      name: 'Linked Devices',
      icon: 'laptop-outline',
      backgroundColor: colors.green,
    },
  ];

  const items = [
    {
      name: 'Account',
      icon: 'key',
      backgroundColor: colors.accentColor,
    },
    {
      name: 'Privacy',
      icon: 'lock-closed',
      backgroundColor: colors.blue,
    },
    {
      name: 'Chats',
      icon: 'logo-elkar',
      backgroundColor: colors.green,
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      backgroundColor: colors.red,
    },
    {
      name: 'Storage and Data',
      icon: 'repeat',
      backgroundColor: colors.green,
    },
  ];

  const support = [
    {
      name: 'Help',
      icon: 'information',
      backgroundColor: colors.accentColor,
    },
    {
      name: 'Tell a Friend',
      icon: 'heart',
      backgroundColor: colors.red,
    },
  ];
  const { signOut } = useAuth();

  const onSignOut = () => {
    signOut();
  };

  return (
    <View style={settingsStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: responsiveScreenHeight(5.7) }}>
        <SettingsList data={devices} />
        <SettingsList data={items} />
        <SettingsList data={support} />
        <Pressable onPress={onSignOut}>
          <Text style={settingsStyles.logOutText}>
            Log Out
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Settings;
