import { Dispatch, SetStateAction } from "react";
import { ImageStyle, TextStyle } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { SharedValue } from "react-native-reanimated";

export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}

export interface DialCodeProps {
  isListDialCodeHide?: boolean;
}

export interface Country {
  name: string;
  dial_code: string;
  code: string;
  image?: string;
}

export interface CountryItemProps {
  item: Country;
  handleCountrySelection: (dialCode: string) => void;
  isListDialCodeHide: boolean;
}

export interface ModalFunctionProps {
  open: boolean;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  countryCodeProps: {
    phoneNumber: string;
    telephoneWithDialCode: string;
    selectedCountryCode: string;
    setSelectedCountryCode: Dispatch<SetStateAction<string>>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    searchValue: string;
    filteredData: Country[];
    NR_PHONE: (string | RegExp)[];
    handleCountrySelection: (selectedCountryCode: SetStateAction<string>) => void;
  };
  toggleModal: () => void;
}

export interface SettingsItem {
  name: string;
  icon: string;
  backgroundColor: string;
}

export interface OTPProps {
  placeHolder: string;
  countryCode: string;
  setSelCountry: Dispatch<SetStateAction<string>>;
  updatePhoneVal: Dispatch<SetStateAction<string>>;
  onDataChange: (data: { phone: string; countryCode: string }) => void;
  onCountryCodeSelected: (selectedCountryCode: string) => void;
}

export interface PhoneNumberInputProps {
  value?: string;
  telephoneWithDialCode?: string;
  onBlur?: () => void;
  inputStyle?: TextStyle;
  searchStyle?: TextStyle;
  flagImgStyle?: ImageStyle;
  downArrowStyle?: ImageStyle;
  placeholderTextColor?: string;
  isListDialCodeHide?: boolean;
  listDialCodeStyle?: TextStyle;
  countryNameTextStyle?: TextStyle;
  countryCodeTextStyle?: TextStyle;
}

export interface TabIconProps {
  name: keyof typeof MaterialIcons.glyphMap;
  size: number;
  color: string;
}

export interface TabScreenProps {
  name: string;
  title: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  headerShown?: boolean;
  tabBarStyle?: object;
}

export interface ChatRowProps {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  unreadCount: number;
}

export interface CustomErrorProps {
  message: string;
}

export interface Props {
  closeModal: () => void;
}

export interface TypewriterProps {
  text: string;
  delay: number;
  infinite: boolean;
}

export interface RightActionProps {
  text: string;
  color: string;
  x: SharedValue<number>;
  progress: SharedValue<number>;
  onPress: () => void;
}

export interface RightActionsProps {
  progress: SharedValue<number>;
  dragAnimatedValue?: SharedValue<number>;
}

export interface ReanimatedSwipeableRowProps {
  children: React.ReactNode;
  onDelete: () => void;
}
