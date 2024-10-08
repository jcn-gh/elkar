import React from 'react';
import { Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { colors } from '../../../constants/Colors';

const CallsLayout = () => {

  const indexHeaderRight = () => {
    return (
      <Pressable>
        <Ionicons name="call-outline" color={colors.accentColor} size={30} />
      </Pressable>
    );
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Calls',
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerStyle: { backgroundColor: colors.backgroundColor1, },
          headerSearchBarOptions: { placeholder: 'Search', },
          headerRight: indexHeaderRight,
        }}
      />
    </Stack>
  );
};

export default CallsLayout;
