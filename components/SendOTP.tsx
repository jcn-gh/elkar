import React, { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, Text } from 'react-native';

import { useSignUp } from '@clerk/clerk-expo';

import { colors } from '../constants/Colors';
import { handleErrors } from '../constants/functions';
import usePhoneNumberCountryCode from '../constants/usePhoneNumberCountryCode';
import { OtpStyles } from '../styles/OtpStyles';
import { TrySignIn } from './TrySignIn';

const handleSendOTPError = (error: Error, phoneNumber: string) => {
  if (error.message === 'form_identifier_exists') {
    return <TrySignIn phoneNumber={phoneNumber} />;
  }
  handleErrors(error, 'An error occurred while trying to send OTP.');
};

export const SendOTP = (): JSX.Element => {
  const { isLoaded, signUp } = useSignUp();
  const { telephoneWithDialCode, selectedCountry } = usePhoneNumberCountryCode();
  const [loading, setLoading] = useState<boolean>(false);

  const sendOTP = useCallback(async (): Promise<void> => {
    if (!isLoaded || !signUp || !selectedCountry || !/^\+[1-9]\d{1,14}$/.test(telephoneWithDialCode)) return;

    setLoading(true);
    try {
      await signUp.preparePhoneNumberVerification();
      window.location.href = `/verify/${encodeURIComponent(telephoneWithDialCode)}`;
    } catch (error: any) {
      handleSendOTPError(error, telephoneWithDialCode);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, signUp, selectedCountry, telephoneWithDialCode]);

  const handlePress = async (): Promise<void> => {
    await sendOTP();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={OtpStyles.button}
      accessibilityLabel="Send OTP"
      accessibilityRole="button"
    >
      <Text style={OtpStyles.buttonText}>Send OTP</Text>
      {loading && <ActivityIndicator size="small" color={colors.accentColor} style={OtpStyles.loading} />}
    </Pressable>
  );
};
