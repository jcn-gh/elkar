import { Dispatch, SetStateAction } from 'react';
import { FlatList, Image, Modal, Pressable, Text, TextInput, View } from 'react-native';

import { colors } from '../constants/Colors';
import { CountrycodeStyles } from '../styles/CountrycodeStyles';
import ModalCloseButton from './ModalCloseButton';

interface CountryData {
  name: string;
  dial_code: string;
  code: string;
  image: string;
}

interface ModalCountryProps {
  open: boolean;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  countryCodeProps: {
    phoneNumber: string;
    telephoneWithDialCode: string;
    selectedCountryCode: string;
    setSelectedCountryCode: Dispatch<SetStateAction<string>>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    searchValue: string;
    filteredData: CountryData[];
    NR_PHONE: (string | RegExp)[];
    handleCountrySelection: (selectedCountryCode: SetStateAction<string>) => void;
  };
  toggleModal: () => void;
}

const ModalCountry: React.FC<ModalCountryProps> = ({ open, searchValue, setSearchValue, countryCodeProps, toggleModal }) => {
  return (
    <Modal visible={open} animationType="fade" transparent>
      <View style={CountrycodeStyles.modalContainer}>
        <View style={CountrycodeStyles.formContainer}>
          <TextInput
            value={searchValue}
            placeholder="Search..."
            onChangeText={setSearchValue}
            style={CountrycodeStyles.searchStyle}
            placeholderTextColor={colors.accentColor} />
          <FlatList
            keyExtractor={(item) => item.code}
            data={countryCodeProps.filteredData}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={CountrycodeStyles.listContainer}
            renderItem={({ item }) => {
              return (
                <Pressable style={CountrycodeStyles.listItemCon} onPress={() => countryCodeProps.handleCountrySelection(item.code)}>
                  <Image source={{ uri: item.image }} style={CountrycodeStyles.itemImgStyle} />
                  <View style={CountrycodeStyles.seperator} />
                  <Text numberOfLines={2} style={CountrycodeStyles.countryName}>{item.code} {' - '} {item.name.toUpperCase()}</Text>
                </Pressable>
              );
            }} />
        </View>
        <ModalCloseButton closeModal={toggleModal} />
      </View>
    </Modal>
  );
}

export default ModalCountry;
