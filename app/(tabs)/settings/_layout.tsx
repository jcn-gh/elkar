import React from 'react';

import { Stack } from 'expo-router';

import { colors } from '../../../constants/Colors';

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.backgroundColor1 },
          headerSearchBarOptions: { placeholder: 'Search', },
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
