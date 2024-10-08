import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { colors } from '../constants/Colors';
import { TypewriterProps } from '../constants/Interfaces';

const Typewriter = ({ text = 'Typewriter', delay = 300, infinite = true }: TypewriterProps): JSX.Element => {
  const [currentText, setCurrentText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const updateText = () => {
      if (currentIndex < text.length) {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        timeout = setTimeout(updateText, delay);
      } else if (infinite) {
        setCurrentIndex(0);
        setCurrentText('');
      }
    };

    const resetText = () => {
      setCurrentIndex(0);
      setCurrentText('');
    };

    if (currentIndex === text.length && infinite) {
      resetText();
    } else {
      updateText();
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return <Text style={{ color: colors.foregroundColor1 }}>{currentText}</Text>;
};

export default Typewriter;