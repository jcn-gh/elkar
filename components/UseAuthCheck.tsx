import { Text } from 'react-native'

import { useAuth } from '@clerk/clerk-expo'

export default function UseAuthCheck() {
  const { isLoaded, userId, sessionId } = useAuth()

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null
  }

  return (
    <Text>
      Hello, {userId} your current active session is {sessionId}
    </Text>
  )
}
