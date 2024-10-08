import React, { FC, memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { segmentedStyles } from '../styles/segmentedStyles';

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
};

const SegmentedControl: FC<SegmentedControlProps> = memo(
  ({ options, selectedOption, onOptionPress }) => {
    const internalPadding = 6;
    const segmentedControlWidth = 180;
    const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => ({
      left: withTiming(itemWidth * options.indexOf(selectedOption) + internalPadding / 2),
    }), [selectedOption, options, itemWidth]);

    return (
      <View style={[segmentedStyles.container, { width: segmentedControlWidth, borderRadius: 6, paddingLeft: internalPadding / 2 }]}>
        <Animated.View style={[{ width: itemWidth, ...rStyle }, segmentedStyles.activeBox]} />
        {options.map((option) => (
          <Pressable
            onPress={() => { onOptionPress?.(option); }}
            key={option}
            style={[{ width: itemWidth }, segmentedStyles.labelContainer]}
          >
            <Text style={segmentedStyles.label}>{option}</Text>
          </Pressable>
        ))}
      </View>
    );
  }
);

export { SegmentedControl };
