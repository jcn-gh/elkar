import { View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/Colors';
import { defaultStyles } from '../styles/Styles';

export type BoxedIconProps = {
  name: typeof Ionicons.defaultProps;
  backgroundColor: string;
};

const BoxedIcon = ({ name, backgroundColor }: BoxedIconProps) => {
  return (
    <View style={[defaultStyles.BoxedIcon, { backgroundColor }]}>
      <Ionicons name={name} size={22} color={colors.foregroundInverseColor} />
    </View>
  );
};
export default BoxedIcon;
