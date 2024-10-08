import React, { useCallback } from "react";
import { Alert, Image, Pressable, Text, View } from 'react-native';

import { useSignIn } from "@clerk/clerk-expo";

import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants/Colors';
import { handleErrors } from '../constants/functions';
import { GhStyles } from '../styles/GhStyles';

export const GitHubBlock = React.memo(() => {
  const { signIn, isLoaded } = useSignIn();
  const MAX_RETRIES = 3;
  let retryCount = 0;

  const signInWithGitHub = useCallback(async () => {
    if (isLoaded) {
      try {
        await signIn.authenticateWithRedirect({
          strategy: "oauth_github",
          redirectUrl: process.env.SSO_CALLBACK_URL ? process.env.SSO_CALLBACK_URL : "/sso-callback",
          redirectUrlComplete: process.env.REDIRECT_URL_COMPLETE ? process.env.REDIRECT_URL_COMPLETE : "/",
        });
      } catch (error: any) {
        handleErrors('Error signing in with GitHub', error);
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
          await signInWithGitHub();
        } else {
          throw new Error(error);
        }
      }
    } else {
      Alert.alert("User feedback", "Sign in with GitHub is not available at the moment.");
    }
  }, [isLoaded, signIn]);

  const handleGitHubSignInClick = useCallback(async () => {
    try {
      await signInWithGitHub();
    } catch (error: any) {
      handleErrors('Error signing in with GitHub', error);
    }
  }, [signInWithGitHub]);

  return (
    <View style={GhStyles.GhContainer}>
      <Pressable style={GhStyles.GhButton} onPress={handleGitHubSignInClick} aria-label="Sign in with GitHub">
        <View style={GhStyles.ImgGhContainer}>
          <Image style={GhStyles.ImgGh}
            accessibilityLabel="Sign in with GitHub"
            source={{ uri: "https://img.clerk.com/static/github.svg?width=160" }}
            resizeMode="contain"
          />
        </View>
        <View style={GhStyles.TextGhContainer}>
          <Text style={GhStyles.TextGh}>Continue with GitHub</Text>
        </View>
        <Svg style={GhStyles.SvgGh}
          fill={colors.foregroundColor1}
          stroke={colors.foregroundColor1}
          viewBox="0 0 20 20"
        >
          <Path
            d="M3.3 10h13.4m-5-5 5 5-5 5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </Svg>
      </Pressable>
    </View>
  );
});
