import { Pressable, Text, View } from 'react-native'

import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'

import { Redirect } from 'expo-router'

export default function Page() {
  const { user } = useUser()

  return (
    <View>
      {user ? (
        <SignedIn>
          <Text>Hello {user.firstName?.[0]}</Text>
        </SignedIn>
      ) : (
        <SignedOut>
          <Pressable onPress={() => <Redirect href={'/(auth)/sign-in'} />}>
            <Text>Sign In</Text>
          </Pressable>
          <Pressable onPress={() => <Redirect href={'/(auth)/sign-up'} />}>
            <Text>Sign Up</Text>
          </Pressable>
        </SignedOut>
      )}
    </View>
  )
}