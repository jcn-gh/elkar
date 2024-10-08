import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

import { useSignUp } from '@clerk/clerk-expo';

import { colors } from '../constants/Colors';
import { handleErrors } from '../constants/functions';
import usePhoneNumberCountryCode from '../constants/usePhoneNumberCountryCode';
import { OtpStyles } from '../styles/OtpStyles';
import { TrySignIn } from './TrySignIn';

export const SendOTP = forwardRef((props, ref) => {
  const { isLoaded, signUp } = useSignUp();
  const { telephoneWithDialCode, selectedCountry } = usePhoneNumberCountryCode();
  const [loading, setLoading] = useState(false);
  const [showTrySignIn, setShowTrySignIn] = useState(false);

  const handleSendOTP = useCallback(async () => {
    if (!isLoaded || !signUp || !selectedCountry || !/^\+[1-9]\d{1,14}$/.test(telephoneWithDialCode)) return;

    setLoading(true);
    try {
      await signUp.preparePhoneNumberVerification();
      window.location.href = `/verify/${encodeURIComponent(telephoneWithDialCode)}`;
    } catch (error: any) {
      if (error.message === 'form_identifier_exists') {
        setShowTrySignIn(true);
      } else {
        handleErrors(error, 'An error occurred while trying to send OTP.');
      }
    } finally {
      setLoading(false);
    }
  }, [isLoaded, signUp, selectedCountry, telephoneWithDialCode]);

  useImperativeHandle(ref, () => ({
    handleSendOTP,
  }));

  return (
    <>
      {showTrySignIn && <TrySignIn phoneNumber={telephoneWithDialCode} />}
      <Pressable
        onPress={handleSendOTP}
        style={OtpStyles.button}
        accessibilityLabel="Send OTP"
        accessibilityRole="button"
      >
        <Text style={OtpStyles.buttonText}>Send OTP</Text>
        {loading && <ActivityIndicator size="small" color={colors.accentColor} style={OtpStyles.loading} />}
      </Pressable>
    </>
  );
});
