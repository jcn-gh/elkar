import React, { Dispatch, SetStateAction } from "react";
import { Image, Pressable, Text, View } from 'react-native';

import MaskInput from 'react-native-mask-input';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../constants/Colors';
import { CountrycodeStyles } from '../styles/CountrycodeStyles';
import { OtpStyles } from '../styles/OtpStyles';
import { Separator } from './Separator';

export const CountryBlock = ({ toggleModal, selectedCountry, phoneNumber, countryCodeProps, setPhoneNumber }: {
  toggleModal: () => void;
  selectedCountry: { name: string; dial_code: string; code: string; image: string; } | undefined;
  phoneNumber: string;
  countryCodeProps: {
    phoneNumber: string;
    telephoneWithDialCode: string;
    selectedCountryCode: string;
    setSelectedCountryCode: Dispatch<SetStateAction<string>>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    searchValue: string;
    filteredData: { name: string; dial_code: string; code: string; image: string; }[];
    NR_PHONE: (string | RegExp)[];
    handleCountrySelection: (selectedCountryCode: SetStateAction<string>) => void;
  };
  setPhoneNumber: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <View style={CountrycodeStyles.container}>
      <Pressable style={CountrycodeStyles.countryCodeCon} onPress={toggleModal}>
        <Image source={{ uri: selectedCountry?.image }} style={CountrycodeStyles.itemImgStyle} />
        <Text style={CountrycodeStyles.countryCodeTxt}>{selectedCountry?.code}</Text>
        <Svg fill={colors.foregroundColor1} stroke={colors.foregroundColor1} viewBox="0 0 20 20" style={CountrycodeStyles.ddIconStyle}>
          <Path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </Svg>
      </Pressable>
      <Separator />
      <MaskInput
        value={phoneNumber}
        autoFocus
        inputMode="numeric"
        maxLength={20}
        placeholder='Type your phone number'
        mask={countryCodeProps.NR_PHONE}
        onChangeText={(masked, unmasked) => setPhoneNumber(masked)}
        aria-invalid="false"
        aria-required="true"
        style={OtpStyles.input} 
      />
    </View>
  );
};

