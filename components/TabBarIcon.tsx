import React, { FC, lazy, memo } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import { handleErrors } from '../constants/functions';
const TabIcon = lazy(() => import('./TabIcon'));

const TabBarIcon: FC<{ size: number; color: string, iconName: keyof typeof MaterialIcons.glyphMap }> = memo(({ size, color, iconName }) => {
  try {
    return <TabIcon name={iconName} size={size} color={color} />;
  } catch (error: any) {
    handleErrors(`Error in tabBarIcon: ${error}`, error);
    return null;
  }
});

TabBarIcon.displayName = 'TabBarIcon';

export default TabBarIcon;