import React, { memo, Suspense, useCallback, useEffect, useMemo } from 'react';
import { Pressable } from 'react-native';

import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Href, SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import Spinner from 'react-native-loading-spinner-overlay';

import { colors } from '../constants/Colors';
import { handleErrors } from '../constants/functions';
import { defaultStyles } from '../styles/Styles';

const LOADING_MESSAGE = 'Loading, please wait...';

const CloseChatButton = memo(() => {
  const router = useRouter();

  const handleCloseChat = useCallback(() => {
    try {
      router.push('/(tabs)/chats' as Href);
    } catch (error: any) {
      handleErrors(`Error occurred while navigating to chats: ${error.message}`, error);
    }
  }, [router]);

  return (
    <Pressable onPress={handleCloseChat} style={defaultStyles.pressable} accessibilityLabel="Close chat screen" accessibilityRole="button">
      <Ionicons name="close" color={colors.foregroundColor2} size={30} />
    </Pressable>
  );
});

const handleSplashScreen = async (userIsSignedIn: boolean) => {
  if (userIsSignedIn && SplashScreen.hideAsync instanceof Function) {
    try {
      await SplashScreen.hideAsync();
    } catch (error: any) {
      handleErrors(`Error occurred while hiding splash screen: ${error.message}`, error);
    }
  }
};

const preventSplashScreenAutoHide = async (): Promise<void> => {
  try {
    await SplashScreen.preventAutoHideAsync();
  } catch (error: any) {
    handleErrors(`Error occurred while preventing auto-hide of splash screen: ${error.stack}`, error);
  }
};

export const InitialLayout = () => {
  const { isLoaded: isAppLoaded, isSignedIn: userIsSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const stackScreenOptions = { headerShown: false };
  const stackScreens = useMemo(() => [
    { key: "index", name: "index" },
    { key: "otp", name: "otp", options: { headerTitle: 'Enter Your Phone Number' } },
    { key: "verify/[phone]", name: "verify/[phone]", options: { title: 'Verify Your Phone Number' } },
    { key: "(tabs)", name: "(tabs)" },
    {
      key: "new-chat-modal",
      name: "(modals)/new-chat",
      options: {
        presentation: 'modal',
        title: 'New Chat',
        headerTransparent: true,
        headerBlurEffect: 'regular',
        headerStyle: { backgroundColor: defaultStyles.backgroundColor },
        headerRight: CloseChatButton,
        headerSearchBarOptions: { placeholder: 'Search name or number', hideWhenScrolling: false },
      },
    },
  ], []);

  useEffect(() => {
    const init = async () => {
      if (!isAppLoaded || !segments) return;

      if (userIsSignedIn && segments.length > 0) {
        router.push('/(tabs)/chats');
      } else {
        try {
          await preventSplashScreenAutoHide();
          await handleSplashScreen(userIsSignedIn);
        } catch (error: any) {
          handleErrors(`Error in preventSplashScreenAutoHide: ${error.message}`, error);
        }
      }
    };

    init();
  }, [isAppLoaded, userIsSignedIn, segments, router]);

  return (
    <Suspense fallback={<Spinner visible={true} textContent={LOADING_MESSAGE} />}>
      <Stack screenOptions={stackScreenOptions}>
        {stackScreens.map(screen => (
          <Stack.Screen key={screen.key} name={screen.name} options={screen.options as any} />
        ))}
      </Stack>
    </Suspense>
  );
};