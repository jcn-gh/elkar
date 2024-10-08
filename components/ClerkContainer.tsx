import React from 'react';
import { Text, View } from 'react-native';

import { Link } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../constants/Colors';
import { OtpStyles } from '../styles/OtpStyles';
import { SignStyledComponents } from '../styles/SignStyledComponents';

const clerkUrl = "https://www.clerk.com";

const ClerkContainer = React.memo(() => (
  <View style={SignStyledComponents.clerkContainer}>
    <Text style={[OtpStyles.legal, { color: colors.backgroundColor1 }]}>Secured by</Text>
    <Link
      style={SignStyledComponents.linkClerk}
      aria-label="Clerk logo"
      href={clerkUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Svg
        key="clerk-svg"
        style={SignStyledComponents.svgClerk}
        viewBox="0 0 77 24"
        fill={colors.backgroundColor1}
      >
        <Path
          d="M19.12 3.16l-2.88 2.88a.57.57 0 0 1-.7.09 6.87 6.87 0 0 0-7.08 0 .57.57 0 0 0-.7.09l-2.89 2.88a.57.57 0 0 0 .07.86 12 12 0 0 0 14.12 0 .57.57 0 0 0 .06-.86ZM12 15.43a3.43 3.43 0 1 0 0-6.86 3.43 3.43 0 0 0 0 6.86Z"
          fill={colors.backgroundColor3}
        />
        <Path
          d="M35.16 16.75a4.2 4.2 0 0 1-3.05 1.28 3.54 3.54 0 0 1-2.6-1.04 3.73 3.73 0 0 1-.99-2.66c0-2.2 1.43-3.7 3.59-3.7A3.92 3.92 0 0 1 35.14 12L37 10.36a6.6 6.6 0 0 0-5.05-2.24c-3.65 0-6.24 2.52-6.24 6.23a6.2 6.2 0 0 0 1.73 4.46 6.14 6.14 0 0 0 4.41 1.73 6.9 6.9 0 0 0 5.21-2.12l-1.9-1.68Zm3.58-13.32h2.76v16.92h-2.76V3.43Zm16.1 11.86c.04-.37.06-.74.07-1.11 0-3.5-2.3-6.05-5.85-6.05-1.69 0-3.16.63-4.22 1.72a6.32 6.32 0 0 0-1.66 4.48c0 3.75 2.65 6.22 6.15 6.22a6.2 6.2 0 0 0 5.06-2.25l-1.8-1.6-.1-.08c-.62.77-1.6 1.41-3.01 1.41a3.32 3.32 0 0 1-3.43-2.74h8.79Zm-8.74-2.22a3.36 3.36 0 0 1 .74-1.45c.57-.65 1.4-1 2.37-1 1.58 0 2.57 1 2.9 2.45H46.1Zm17.37-4.98v3.1a13.1 13.1 0 0 0-.83-.06c-2.1 0-3.29 1.5-3.29 3.48v5.74H56.6V8.27h2.76v1.83h.03c.93-1.29 2.3-2 3.75-2h.34Zm6.44 7.2-2 2.22v2.84h-2.76V3.43h2.76V13.8l4.94-5.5h3.28l-4.34 4.86 4.42 7.18H73.1l-3.14-5.06h-.05Z"
          fill={colors.backgroundColor2}
        />
      </Svg>
    </Link>
  </View>
));

export default ClerkContainer;