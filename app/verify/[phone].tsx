import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { useLocalSearchParams } from 'expo-router';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { handleErrors } from '../../constants/functions';
import { OTPStyledComponents } from '../../styles/OtpStyledComponents';
import { phoneStyles } from '../../styles/phoneStyles';

const INPUT_LENGTH = 6;

const OTPVerification = () => {
  const { phone, signin } = useLocalSearchParams<{ phone: string; signin: string }>();
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: INPUT_LENGTH });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: code, setValue: setCode });
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const handleVerification = useCallback(async (verificationType: string) => {
    try {
      const { createdSessionId } = verificationType === 'signUp' ? signUp! : signIn!;
      const session = createdSessionId;
      const verificationMethod = verificationType === 'signUp' ? signUp!.attemptPhoneNumberVerification : signIn!.attemptFirstFactor;

      await verificationMethod({ strategy: verificationType === 'signUp' ? 'phone_code' : 'email_code', code });
      await setActive!({ session });
    } catch (error) {
      handleErrors('error', JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].message);
      }
    }
  }, [code, setActive, signUp, signIn]);

  useEffect(() => {
    if (code.length === INPUT_LENGTH) {
      console.log('info', 'verify', { code });
      handleVerification(signin === 'true' ? 'signIn' : 'signUp');
    }
  }, [code, signin, handleVerification]);

  const handleResendCode = useCallback(async () => {
    try {
      if (signin === 'true') {
        const { supportedFirstFactors } = await signIn!.create({ identifier: phone ?? '' });
        const firstPhoneFactor = supportedFirstFactors!.find(factor => factor.strategy === 'phone_code') as { phoneNumberId: string };
        const { phoneNumberId } = firstPhoneFactor;
        await signIn!.prepareFirstFactor({ strategy: 'phone_code', phoneNumberId });
      } else {
        await signUp!.create({ phoneNumber: phone });
        signUp!.preparePhoneNumberVerification();
      }
    } catch (error) {
      handleErrors('error', JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].message);
      }
    }
  }, [phone, signin, signIn, signUp]);

  return (
    <View style={OTPStyledComponents.mainContainer}>
      <View style={OTPStyledComponents.contentContainer}>
        <View style={OTPStyledComponents.header}>
          <Text style={OTPStyledComponents.title}>Enter OTP {phone}</Text>
          <View style={OTPStyledComponents.spacer} />
          <Text style={OTPStyledComponents.subtitle}>We have sent you an SMS with a code to <Text style={OTPStyledComponents.highlight}>87******47 {phone}</Text> <br></br>To complete your phone number verification, please enter the 6-digit activation code.</Text>
        </View>
        <View style={OTPStyledComponents.otpContainer}>
          <CodeField
            {...props}
            ref={ref}
            value={code}
            onChangeText={setCode}
            cellCount={INPUT_LENGTH}
            rootStyle={phoneStyles.codeFieldRoot}
            inputMode="numeric"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[phoneStyles.cellRoot, isFocused && phoneStyles.focusCell]}
              >
                <Text style={phoneStyles.cellText}> {symbol || (isFocused ? <Cursor /> : null)} </Text>
                {code.length < INPUT_LENGTH && (<View style={OTPStyledComponents.spacerHorizontal} />)}
              </View>
            )}
          />
        </View>
        <View style={OTPStyledComponents.feedbackContainer}>
          <Text style={OTPStyledComponents.feedbackText}>Didn’t receive the OTP?
            <Pressable style={phoneStyles.button} onPress={handleResendCode}> <Text>RESEND OTP</Text> </Pressable>
          </Text>
        </View>
        <Pressable style={phoneStyles.button}> <Text>PROCEED</Text> </Pressable>
      </View>
      <View style={OTPStyledComponents.footer}>
        <Text style={OTPStyledComponents.footerText}>Already have an account?</Text>
        <View style={OTPStyledComponents.spacerHorizontalSmall} />
        <Pressable style={phoneStyles.button} touch-action={signin}> <Text>Sign In</Text> </Pressable>
      </View>
    </View>
  );
};

export default OTPVerification;

