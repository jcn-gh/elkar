import React, { useCallback } from 'react';
import { Pressable, Text } from 'react-native';

import { useSignIn } from '@clerk/clerk-expo';

import { getPhoneFactor, handleErrors } from '../constants/functions';
import { OtpStyles } from '../styles/OtpStyles';

export const TrySignIn = ({ phoneNumber }: { phoneNumber: string }): JSX.Element => {
  const { signIn: signInInstance } = useSignIn() ?? {};

  const handleTrySignIn = useCallback(async () => {
    if (!signInInstance) return;

    try {
      const factors = await signInInstance.create({ identifier: phoneNumber });
      if (!Array.isArray(factors) || factors.length === 0) {
        throw new Error('No supported first factors found');
      }
      const phoneFactor = getPhoneFactor(factors);
      if (!phoneFactor) {
        throw new Error('No phone factor found');
      }
      await signInInstance.prepareFirstFactor({ strategy: 'phone_code', phoneNumberId: phoneFactor.phoneNumberId });
    } catch (error: any) {
      handleErrors('Error occurred while trying to sign in', error);
    }
  }, [signInInstance, phoneNumber]);

  return (
    <Pressable onPress={handleTrySignIn} style={OtpStyles.button} accessibilityLabel="Try signing in" accessibilityRole="button">
      <Text style={OtpStyles.buttonText}>Try signing in</Text>
    </Pressable>
  );
};