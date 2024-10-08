import { useClerk } from '@clerk/clerk-expo'
import { Pressable, Text } from 'react-native'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <Pressable onPress={() => signOut({ redirectUrl: '/' })}>
      <Text>Sign out</Text>
    </Pressable>
  )
}