import React, { FC, useRef } from 'react';
import { TextInput, View } from 'react-native';

import { OTPStyledComponents } from '../styles/OtpStyledComponents';

const RenderInputFields: FC = () => {
  const inputLength = 6;
  const inputValuesRef = useRef<string[]>(Array(inputLength).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>(Array(inputLength).fill(null));

  const handleInputChange = (index: number, value: string) => {
    inputValuesRef.current[index] = value;
    const nextIndex = index + 1;
    if (value.length > 0 && nextIndex < inputLength) {
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const renderInput = (index: number) => {
    const refCallback = (ref: TextInput | null) => (inputRefs.current[index] = ref);

    return (
      <TextInput
        key={`input-${index}`}
        ref={refCallback}
        onChangeText={(value) => handleInputChange(index, value)}
        maxLength={1}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        autoFocus={index === 0}
        keyboardType="numeric"
        style={OTPStyledComponents.otpInput}
        value={inputValuesRef.current[index]}
      />
    );
  };

  return (
    <View>
      {Array.from({ length: inputLength }, (_, index) => (
        <View key={`input-wrapper-${index}`} style={OTPStyledComponents.inputContainer}>
          {renderInput(index)}
          {index < inputLength - 1 && <View style={OTPStyledComponents.spacerHorizontal} />}
        </View>
      ))}
    </View>
  );
};

export default RenderInputFields;