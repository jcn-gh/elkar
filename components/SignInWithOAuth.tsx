import React, { useCallback, useEffect } from 'react'
import { Pressable, Text } from 'react-native'

import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'

import { handleErrors } from '../constants/functions'

export const useWarmUpBrowser = (): void => {
  useEffect(() => {
    const warmUpAsync = async () => {
      if (typeof WebBrowser.warmUpAsync !== 'function') {
        throw new Error('WebBrowser.warmUpAsync is not a function');
      }

      try {
        await WebBrowser.warmUpAsync();
      } catch (error: any) {
        handleErrors('WebBrowser.warmUpAsync error', error);
      }
    };

    const coolDownAsync = async () => {
      if (typeof WebBrowser.coolDownAsync !== 'function') {
        throw new Error('WebBrowser.coolDownAsync is not a function');
      }

      try {
        await WebBrowser.coolDownAsync();
      } catch (error: any) {
        handleErrors('WebBrowser.coolDownAsync error', error);
      }
    };

    warmUpAsync();

    return () => {
      coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
      });
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error: any) {
      handleErrors('OAuth error', error);
    }
  }, [startOAuthFlow]);

  return (
    <Pressable onPress={onPress}>
      <Text>Sign in with Google</Text>
    </Pressable>
  );
};

export default SignInWithOAuth;
