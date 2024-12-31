import { colors } from './colors';

export const theme = {
  colors,
  fontFamily: {
    cyber: ['Space Grotesk', 'sans-serif'],
  },
  boxShadow: {
    neon: '0 0 15px rgba(0, 240, 255, 0.5)',
    'neon-strong': '0 0 30px rgba(0, 240, 255, 0.8)',
  },
} as const;