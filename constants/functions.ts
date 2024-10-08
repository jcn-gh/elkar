import { useMemo } from "react";
import { Alert, Linking } from "react-native";

import { countryCodesData } from "../constants/Countrycode";

export const handleErrors = (error: Error | string, text: string): void => {
  const errorMessage = error instanceof Error ? error.message : text;
  
  Alert.alert("Error", errorMessage);
  
  try {
    console.error("Error occurred", { error: errorMessage });
  } catch (loggingError: any) {
    handleErrors(loggingError, `Error occurred while logging: ${loggingError.message}`);
  }
};

export const openLink = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch (error: any) {
    handleErrors(error, "Error in openLink");
  }
};

export const isValidPhoneNumber = (str: string) =>
  str.length === 10 && /^\d*[6-9]\d{9}$/.test(str);

export const truncateString = (inputString: string, maxLength: number) =>
  inputString.length > maxLength
    ? inputString.slice(0, maxLength) + "..."
    : inputString;

export function splitTextUsingRegex(inputString: string): string[] {
  const characters: string[] = [];
  // to match any character (including line breaks and special characters)
  const regex = /[\s\S]/gu;
  let match;
  while ((match = regex.exec(inputString)) !== null) {
    characters.push(match[0]);
  }
  return characters;
}

export const formatDate = (timestamp: number) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(new Date(timestamp * 1000));

export const formatTimestamp = (timestamp: number) => {
  const d = new Date(timestamp * 1000);
  const h = d.getHours() % 12 || 12;
  const m = `0${d.getMinutes()}`.slice(-2);
  const a = h < 12 ? "AM" : "PM";
  const hour = h % 12 || 12;

  return `${hour}:${m} ${a}`;
};

export const usePhoneNumberMask = () => {
  const NR_PHONE = useMemo(() => [
    ' ', /\d/, /\d/, /\d/,
    ' ', /\d/, /\d/,
    ' ', /\d/, /\d/,
    ' ', /\d/, /\d/,
    ' ', /\d/, /\d/,
    ' ', /\d/, /\d/,
  ], []);

  return NR_PHONE;
};

export type SupportedFirstFactors = Array<{ strategy: string; phoneNumberId?: string }>;
export type PhoneFactor = { strategy: string; phoneNumberId: string };

export const getPhoneFactor = (supportedFirstFactors: SupportedFirstFactors | null): PhoneFactor => {
  const phoneFactor = supportedFirstFactors?.find(
    (factor) => factor.strategy === 'phone_code' && 'phoneNumberId' in factor
  );
  if (!phoneFactor) {
    throw new Error('No phone factor found');
  }
  return phoneFactor as PhoneFactor;
};

export const useFilteredData = (searchValue: string, selectedCountryCode: string) => {
  return useMemo(() => {
    const filtered = countryCodesData.filter(({ name, code, dial_code }) =>
      [name, code, dial_code].some(str => str.toLowerCase().includes(searchValue.toLowerCase()))
    );
    const selected = filtered.find(item => item.code === selectedCountryCode);
    return { filteredData: filtered, selectedCountry: selected };
  }, [searchValue, selectedCountryCode]);
};

export const truncateMessage = (message: string, len: number) => {
  return message.length > len ? `${message.substring(0, len)}...` : message;
};