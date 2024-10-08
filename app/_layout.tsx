import React, { memo, Suspense, useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';

import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import ErrorBoundary from 'react-native-error-boundary';
import Spinner from 'react-native-loading-spinner-overlay';

import { InitialLayout } from '../components/InitialLayout';
import { handleErrors } from '../constants/functions';
import tokenCache from '../constants/tokenCache';
import { defaultStyles } from '../styles/Styles';

const LOADING_MESSAGE = 'Loading, please wait...';

const CustomFallback = memo((props: { error: Error | null, resetError: Function }) => {
  const resetErrorCallback = useCallback(() => props.resetError(), [props.resetError]);
  const handlePress = () => {
    try {
      resetErrorCallback();
    } catch (error: any) {
      handleErrors('Error resetting:', error);
    }
  };

  return (
    <View style={defaultStyles.p20}>
      <Text>Something happened!</Text>
      {<Text>{props.error instanceof Error ? props.error.message : 'An unexpected error occurred. Please try again.'}</Text>}
      <Pressable onPress={handlePress} accessibilityLabel="Retry the action" accessibilityRole="button">
        <Text style={defaultStyles.primaryColor}>Retry</Text>
      </Pressable>
    </View>
  );
}, (prevProps, nextProps) => prevProps.error === nextProps.error && prevProps.resetError === nextProps.resetError);

const errorHandler = (error: any, stackTrace?: string) => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  if (stackTrace) {
    handleErrors(`An error occurred with stack trace: ${errorMessage}\nStack Trace: ${stackTrace}`, error);
  } else {
    handleErrors(`An error occurred without stack trace: ${errorMessage}`, error);
  }
};

const RootLayoutNav = () => {
  if (!process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || typeof process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'string' || process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY.trim() === '') {
    throw new Error('Missing or invalid Publishable Key. Please set a valid EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env');
  }

  return (
    <ErrorBoundary
      FallbackComponent={CustomFallback}
      onError={errorHandler}>
      <Suspense fallback={process.env.SHOW_SPINNER ? <Spinner visible={true} textContent={LOADING_MESSAGE} /> : <Text>Loading, please wait...</Text>}>
        <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
          <ClerkLoaded>
            <InitialLayout />
          </ClerkLoaded>
        </ClerkProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default RootLayoutNav;