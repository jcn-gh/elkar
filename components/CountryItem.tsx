import React, { FC } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { CountryItemProps } from '../constants/Interfaces';
import { CountrycodeStyles } from '../styles/CountrycodeStyles';

const CountryItem: FC<CountryItemProps> = ({ item, handleCountrySelection, isListDialCodeHide }) => {
  const { image, dial_code, code, name } = item;

  const handlePress = () => handleCountrySelection(dial_code);

  return (
    <Pressable style={CountrycodeStyles.listItemCon} onPress={handlePress}>
      <Image source={{ uri: image }} style={CountrycodeStyles.itemImgStyle} />
      {!isListDialCodeHide && <Text style={CountrycodeStyles.dialTextStyle}>{dial_code}</Text>}
      <View style={CountrycodeStyles.seperator} />
      <Text numberOfLines={2} style={CountrycodeStyles.countryName}>{`${code} - ${name.toUpperCase()}`}</Text>
    </Pressable>
  );
};

export default CountryItem;