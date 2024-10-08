import React, { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, Modal, Pressable, Text, TextInput, View } from 'react-native';

import { useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';

import { Redirect } from 'expo-router';
import ModalCloseButton from "../components/ModalCloseButton";
import { Separator } from '../components/Separator';
import { TrySignIn } from '../components/TrySignIn';
import { colors } from '../constants/Colors';
import { handleErrors, openLink } from '../constants/functions';
import usePhoneNumberCountryCode from '../constants/usePhoneNumberCountryCode';
import { CountrycodeStyles } from '../styles/CountrycodeStyles';
import { OtpStyles } from '../styles/OtpStyles';

const handleSendOTPError = (error: Error, phoneNumber: string) => {
  if (error.message === 'form_identifier_exists') {
    return <TrySignIn phoneNumber={phoneNumber} />;
  }
  handleErrors(error, 'An error occurred while trying to send OTP.');
};

const SendOTP = memo(() => {
  const { isLoaded, signUp } = useSignUp();
  const { telephoneWithDialCode, selectedCountry } = usePhoneNumberCountryCode();
  const [loading, setLoading] = useState(false);

  const sendOTP = useCallback(async () => {
    if (!isLoaded || !signUp || !selectedCountry || !/^\+[1-9]\d{1,14}$/.test(telephoneWithDialCode)) return;
    setLoading(true);
    try {
      await signUp?.preparePhoneNumberVerification();
      <Redirect href={`/verify/${encodeURIComponent(telephoneWithDialCode)}`} />
    } catch (error: any) {
      handleSendOTPError(error, telephoneWithDialCode);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, signUp, selectedCountry, telephoneWithDialCode]);

  useEffect(() => {
    sendOTP();
  }, [isLoaded, signUp, selectedCountry, telephoneWithDialCode]);

  return (
    <Pressable onPress={sendOTP} style={OtpStyles.button} accessibilityLabel="Send OTP" accessibilityRole="button">
      <Text style={OtpStyles.buttonText}>Send OTP</Text>
      {loading && <ActivityIndicator size="small" color={colors.accentColor} style={OtpStyles.loading} />}
    </Pressable>
  );
});

const OTP = (): JSX.Element => {
  const { selectedCountry, setPhoneNumber, setSearchValue, toggleModal, ...countryCodeProps } = usePhoneNumberCountryCode();
  const [loading, setLoading] = useState<boolean>(false);
  const { phoneNumber, searchValue, open } = countryCodeProps;

  return (
    <KeyboardAvoidingView style={OtpStyles.flexFill} behavior="padding">
      {loading && (
        <View style={OtpStyles.loading}>
          <ActivityIndicator size="large" color={colors.accentColor} />
          <Text style={OtpStyles.loadingText}>Sending code...</Text>
        </View>
      )}
      <View style={OtpStyles.container}>
        <Text style={OtpStyles.description}>Elkar will need to verify your account. Carrier charges may apply.</Text>
        <View style={OtpStyles.flexFill}>
          <View style={OtpStyles.list}>
            <View style={OtpStyles.listItem}>
              <Text style={OtpStyles.listItemText}>{selectedCountry?.name && selectedCountry?.dial_code ? `${selectedCountry.name} (${selectedCountry.dial_code})` : ''}</Text>
              <Ionicons name="chevron-forward" style={OtpStyles.icon} />
            </View>
            <Separator />
          </View>
          <View style={CountrycodeStyles.container}>
            <Pressable style={CountrycodeStyles.countryCodeCon} onPress={toggleModal}>
              <Image source={{ uri: selectedCountry?.image }} style={CountrycodeStyles.itemImgStyle} />
              <Text style={CountrycodeStyles.countryCodeTxt}> {selectedCountry?.code} </Text>
              <Image source={require("../assets/images/dd_icon.png")} resizeMode="contain" resizeMethod="resize" style={CountrycodeStyles.ddIconStyle} />
            </Pressable>
            <Separator />
            <MaskInput
              value={phoneNumber}
              inputMode="numeric"
              maxLength={25}
              autoFocus
              placeholder='Type your phone number'
              mask={countryCodeProps.NR_PHONE}
              onChangeText={(masked, unmasked) => setPhoneNumber(masked)}
              style={OtpStyles.input}
            />
          </View>
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
                  renderItem={({ item }) => {
                    try {
                      return (
                        <Pressable style={CountrycodeStyles.listItemCon} onPress={() => countryCodeProps.handleCountrySelection(item.code)}>
                          <Image source={{ uri: item.image }} style={CountrycodeStyles.itemImgStyle} />
                          <View style={CountrycodeStyles.seperator} />
                          <Text numberOfLines={2} style={CountrycodeStyles.countryName}>{item.code} {' - '} {item.name.toUpperCase()}</Text>
                        </Pressable>
                      );
                    } catch (error) {
                      console.error('Error in rendering FlatList item:', error);
                      return null;
                    }
                  }}
                />
              </View>
              <ModalCloseButton closeModal={toggleModal} />
            </View>
          </Modal>
        </View>
        <Text style={OtpStyles.legal}>You must be{' '}
          <Text style={OtpStyles.link} onPress={() => openLink('https://en.wikipedia.org/wiki/Legal_age')}>
            at least the legal age of majority in your country of residence{' '} </Text>in order to register.
        </Text>
        <Text style={OtpStyles.legal}>Find out about the differences between Elkar and the{' '}
          <Text style={OtpStyles.link} onPress={() => openLink('https://www.ccn.com/education/crypto/telegram-whatsapp-discord-signal-encryption-crypto-integration/')}>
            Other Apps{' '} </Text>out there.
        </Text>
        <View style={OtpStyles.flexFill} />
        <Pressable
          style={[OtpStyles.button, phoneNumber !== '' ? OtpStyles.enabled : null, OtpStyles.buttonMargin]}
          onPress={SendOTP}
          disabled={!selectedCountry || phoneNumber === ''}>
          <Text style={[OtpStyles.buttonText, phoneNumber !== '' ? OtpStyles.enabled : null]}>Next</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OTP;