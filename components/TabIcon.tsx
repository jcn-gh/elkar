import React, { FC, memo } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import { TabIconProps } from '../constants/Interfaces';

const TabIcon: FC<TabIconProps> = memo(({ name, size, color }) => (
  <MaterialIcons name={name} size={size} color={color} />
));

export default TabIcon;