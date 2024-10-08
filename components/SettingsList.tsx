import { Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { FlatList, Text, View } from 'react-native';

import BoxedIcon from '../components/BoxedIcon';
import { Separator } from '../components/Separator';
import { colors } from '../constants/Colors';
import { SettingsItem } from '../constants/Interfaces';
import { defaultStyles } from '../styles/Styles';
import { settingsStyles } from '../styles/settingsStyles';

const SettingsList: FC<{ data: SettingsItem[] }> = ({ data }) => {
  const renderItem = ({ item }: { item: SettingsItem }) => (
    <View style={defaultStyles.item}>
      <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
      <Text style={settingsStyles.renderItemText}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.foregroundColor2} />
    </View>
  );

  return (
    <View style={defaultStyles.block}>
      <FlatList
        data={data}
        scrollEnabled={false}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default SettingsList;