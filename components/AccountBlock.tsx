import React, { Dispatch, SetStateAction } from "react";
import { Pressable, Text, View } from 'react-native';

import { OtpStyles } from '../styles/OtpStyles';
import { SignStyledComponents } from '../styles/SignStyledComponents';
import { Separator } from './Separator';

export const AccountBlock = ({ signedIn, setSignedIn }: { signedIn: boolean; setSignedIn: Dispatch<SetStateAction<boolean>> }) => {
  const handleSignInClick = () => setSignedIn(true);
  const handleSignUpClick = () => setSignedIn(false);

  return (
    <View style={SignStyledComponents.footer}>
      <View style={SignStyledComponents.footerAction}>
        <Text style={SignStyledComponents.footerActionText}>{signedIn ? 'No account?' : 'Have an account?'}</Text>
        <Pressable onPress={signedIn ? handleSignUpClick : handleSignInClick}>
          <Text style={OtpStyles.link}>{signedIn ? 'Sign up' : 'Sign in'}</Text>
        </Pressable>
      </View>
      <Separator />
    </View>
  );
};
