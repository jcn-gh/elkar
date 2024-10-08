import React, { useCallback, useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'

import { useSignIn } from '@clerk/clerk-expo'
import { PhoneCodeFactor, SignInFirstFactor } from '@clerk/types'
import { Link, useRouter } from 'expo-router'

import { handleErrors } from '../../constants/functions'

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [verifying, setVerifying] = useState(false)
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const router = useRouter()

  const onSignInPress = useCallback(async () => {
    if (!isLoaded && !signIn) return null

    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: phone,
      })

      const isPhoneCodeFactor = (factor: SignInFirstFactor): factor is PhoneCodeFactor => {
        return factor.strategy === 'phone_code'
      }
      const phoneCodeFactor = supportedFirstFactors?.find(isPhoneCodeFactor)

      if (phoneCodeFactor) {
        const { phoneNumberId } = phoneCodeFactor
        await signIn.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId,
        })
        setVerifying(true)
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      handleErrors('Error:', JSON.stringify(err, null, 2))
    }
  }, [isLoaded, phone])

  const onPressVerify = async () => {
    if (!isLoaded && !signIn) return null
    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'phone_code',
        code,
      })
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.push('/')
      } else {
        handleErrors('Error:', JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      handleErrors('Error:', JSON.stringify(err, null, 2))
    }
  }

  if (verifying) {
    return (
      <>
        <TextInput value={code} placeholder="Enter your verification code..." onChangeText={(code) => setCode(code)} />
        <Button title="Verify" onPress={onPressVerify} />
      </>
    )
  }

  return (
    <View>
      <TextInput
        autoCapitalize="none"
        value={phone}
        placeholder="Enter phone number..."
        onChangeText={(phone) => setPhone(phone)}
      />

      <Button title="Sign In" onPress={onSignInPress} />
      <View>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  )
}