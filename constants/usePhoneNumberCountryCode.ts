import { SetStateAction, useCallback, useMemo, useState } from 'react';

import { useFilteredData, usePhoneNumberMask } from '../constants/functions';

const usePhoneNumberCountryCode = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState('ES');
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { filteredData, selectedCountry } = useFilteredData(searchValue, selectedCountryCode);
  const NR_PHONE = usePhoneNumberMask();

  const calculateTelephoneWithDialCode = (selectedCountry: { dial_code: string; }, phoneNumber: string) => {
    return selectedCountry?.dial_code 
    ? `${selectedCountry.dial_code}${phoneNumber}`.replace(/\s/g, '') 
    : phoneNumber.replace(/\s/g, '');
  };
  
  const telephoneWithDialCode = useMemo(() => calculateTelephoneWithDialCode(selectedCountry || { dial_code: '' }, phoneNumber), [selectedCountry, phoneNumber]);

  const toggleModal = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
    setSearchValue("");
  }, []);

  const handleCountrySelection = useCallback((selectedCountryCode: SetStateAction<string>) => {
    setSelectedCountryCode(selectedCountryCode);
    setOpen(false);
    setSearchValue("");
  }, []);

  return { 
    phoneNumber, 
    setPhoneNumber, 
    telephoneWithDialCode, 
    selectedCountryCode, 
    setSelectedCountryCode, 
    open, 
    setOpen, 
    searchValue, 
    setSearchValue, 
    filteredData, 
    selectedCountry, 
    NR_PHONE, 
    toggleModal, 
    handleCountrySelection 
  };
};

export default usePhoneNumberCountryCode;