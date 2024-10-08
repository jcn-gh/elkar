import React, { FC } from 'react';
import { FlatList, Image, Modal, Pressable, Text, TextInput, View } from 'react-native';

import { colors } from '../constants/Colors';
import { ModalFunctionProps } from '../constants/Interfaces';
import { CountrycodeStyles } from '../styles/CountrycodeStyles';
import ModalCloseButton from './ModalCloseButton';

const ModalFunction: FC<ModalFunctionProps> = ({
  open,
  searchValue,
  setSearchValue,
  countryCodeProps,
  toggleModal,
}) => {
  const handleCountrySelection = (code: string) => {
    countryCodeProps.handleCountrySelection(code);
  };

  return (
    <Modal visible={open} animationType="fade" transparent>
      <View style={CountrycodeStyles.modalContainer}>
        <View style={CountrycodeStyles.formContainer}>
          <TextInput
            value={searchValue}
            placeholder="Search..."
            onChangeText={setSearchValue}
            style={CountrycodeStyles.searchStyle}
            placeholderTextColor={colors.accentColor}
          />
          <FlatList
            keyExtractor={(item) => item.code}
            data={countryCodeProps.filteredData}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={CountrycodeStyles.listContainer}
            renderItem={({ item }) => (
              <Pressable
                style={CountrycodeStyles.listItemCon}
                onPress={() => handleCountrySelection(item.code)}
              >
                <Image source={{ uri: item.image }} style={CountrycodeStyles.itemImgStyle} />
                <View style={CountrycodeStyles.seperator} />
                <Text numberOfLines={2} style={CountrycodeStyles.countryName}>
                  {`${item.code} - ${item.name.toUpperCase()}`}
                </Text>
              </Pressable>
            )}
          />
        </View>
        <ModalCloseButton closeModal={toggleModal} />
      </View>
    </Modal>
  );
};

export default ModalFunction;
