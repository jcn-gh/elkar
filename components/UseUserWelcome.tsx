import { Text } from 'react-native'

import { useUser } from '@clerk/clerk-expo'

export default function UseUserWelcome() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return <Text>Hello, {user.firstName} welcome to Clerk</Text>
}
