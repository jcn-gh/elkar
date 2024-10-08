import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

import { handleErrors } from '../../constants/functions'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [verifying, setVerifying] = useState(false)
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const router = useRouter()

  const onSignUpPress = async () => {
    if (!isLoaded && !signUp) return null

    try {
      await signUp.create({
        phoneNumber: phone,
      })

      await signUp.preparePhoneNumberVerification()

      setVerifying(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      handleErrors('Error: ', JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded && !signUp) return null

    try {
      const signInAttempt = await signUp.attemptPhoneNumberVerification({
        code,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })

        router.push('/')
      } else {
        handleErrors('Error: ', JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      handleErrors('Error: ', JSON.stringify(err, null, 2))
    }
  }

  return (
    <View>
      {!verifying ? (
        <>
          <TextInput
            value={phone}
            placeholder="Enter phone number..."
            onChangeText={setPhone}
            autoCapitalize="none"
          />
          <Pressable onPress={onSignUpPress}>
            <Text>Sign Up</Text>
          </Pressable>
        </>
      ) : (
        <>
          <TextInput
            value={code}
            placeholder="Enter your verification code..."
            onChangeText={setCode}
          />
          <Pressable onPress={onPressVerify}>
            <Text>Verify</Text>
          </Pressable>
        </>
      )}
    </View>
  )
}