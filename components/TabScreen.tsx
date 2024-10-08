import React, { FC, useCallback, useMemo } from 'react';

import { Tabs } from 'expo-router';
import ErrorBoundary from 'react-native-error-boundary';

import { colors } from '../constants/Colors';
import { TabScreenProps } from '../constants/Interfaces';
import TabBarIcon from './TabBarIcon';

const TabScreen: FC<TabScreenProps> = React.memo(({ name, title, iconName, headerShown = true, tabBarStyle }: TabScreenProps) => {
  const tabBarIconMemoized = useCallback(() => TabBarIcon({ size: 24, color: colors.black, iconName }), [iconName]);
  const options = useMemo(() => ({ title, tabBarIcon: tabBarIconMemoized, headerShown, tabBarStyle }), [title, tabBarIconMemoized, headerShown, tabBarStyle]);

  return (
    <ErrorBoundary>
      <Tabs.Screen name={name} options={options} />
    </ErrorBoundary>
  );
});
TabScreen.displayName = 'TabScreen';

export default TabScreen;