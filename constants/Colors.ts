import { Appearance } from 'react-native';

export type Theme = {
  dark: boolean;
  theme: 'dark' | 'light';
  colors: {
    primary: string;
    secondary: string;
    muted: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    annotations: string;
    accent: string;
    accent2: string;
    foreground: string;
    negative: string;
    overlay: string;
    glass: string;
    transparent: string;
  };
};

const baseTheme = Object.freeze({
  primary: '#e9602c',
  secondary: '#a8cb19',
  negative: '#EF0827',
  delete: '#dd2c00',
  muted: '#3A5A92',
  transparent: "transparent",
});

const cache = new Map<boolean, Theme>();

function generateTheme(isDark: boolean): Theme {
  if (cache.has(isDark)) return cache.get(isDark)!;
  
  const theme: Theme = {
    dark: isDark,
    theme: isDark ? 'dark' : 'light',
    colors: {
      primary: baseTheme.primary,
      secondary: baseTheme.secondary,
      negative: baseTheme.negative,
      muted: baseTheme.muted,
      transparent: baseTheme.transparent,
      background: isDark ? '#141414' : '#FFFFFF',
      card: isDark ? '#272A2A' : '#F1F3F3',
      text: isDark ? '#E4E7E7' : '#141414',
      border: isDark ? '#6E7777' : '#9EA9A9',
      notification: isDark ? '#949E9E' : '#798686',
      annotations: isDark ? '#6E7777' : '#9EA9A9',
      accent: isDark ? '#a8cb19' : '#e9602c',
      accent2: isDark ? '#e9602c' : '#a8cb19',
      foreground: isDark ? '#949E9E' : '#798686',
      overlay: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      glass: isDark ? 'rgb(39, 42, 42)' : 'rgb(244, 245, 245)',
    },
  };
  
  cache.set(isDark, theme);
  return theme;
}

const getColor = (color: keyof Theme['colors']) => theme.colors[color] ?? '#000000';

export const theme = Object.freeze(generateTheme(Appearance?.getColorScheme?.() === 'dark' || false));
export const DarkTheme = Object.freeze(generateTheme(true));
export const LightTheme = Object.freeze(generateTheme(false));

export const colors = Object.freeze({
  black: '#000000',
  lightblue: 'lightblue',
  blue: '#1063FD',
  darkblue: "darkblue",
  lightGray: '#C8C7CD',
  gray: '#6E6E73',
  darkgray:'#112211',
  lightGreen: "#C7FFC1",
  green: '#4FEE57',
  darkgreen: "darkgreen",
  lightred: "#FED7D7",
  red: "#E1111E",
  darkred: 'darkred',
  white: '#FFFFFF',
  lightyellow: "#FFFFB0",
  yellow: "#F1D31A",
  darkyellow: '#FCBF0B',
  lightpurple: "#A59AE3",
  purple: "#613DC1",
  darkpurple: "#4C1D95",
  purple4: "rgba(97, 61, 193, 1)",
  lighttext: "rgba(0, 0, 0, 0.5)",
  primary: '#E9602C',
  secondary: '#A8CB19',
  muted: '#3A5A92',
  negative: '#EF0827',
  delete: '#dd2c00',
  transparent: "transparent",
  backgroundColor1: getColor('background'),
  backgroundColor2: getColor('card'),
  backgroundColor3: getColor('border'),
  foregroundColor1: getColor('text'),
  foregroundColor2: getColor('notification'),
  foregroundColor3: getColor('annotations'),
  foregroundInverseColor: getColor('background'),
  primaryColor: getColor('primary'),
  secondaryColor: getColor('secondary'),
  errorColor: getColor('negative'),
  textColor: getColor('text'),
  borderColor: getColor('border'),
  accentColor: getColor('accent'),
  accentColor2: getColor('accent2'),
  overlayColor: getColor('overlay'),
  glassColor: getColor('glass'),
});