import { extendTheme } from '@chakra-ui/react';
import 'typeface-roboto';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'base'
      },
      variants: {
        btnDallas: {
          bg: 'linear-gradient(120deg, #556FFF 0%, #2E3ACA 100%)',
          boxShadow: '0px 12px 30px 0px rgba(62, 84, 197, 0.35)',
          _hover: {
            background: 'linear-gradient(120deg, #6178FF 0%, #3B49D6 100%)',
            opacity: 1,
            boxShadow: '0px 16px 32px 0px rgba(62, 84, 197, 0.45)'
          },
          _active: {
            background: 'linear-gradient(120deg, #495EE0 0%, #2E3ACA 100%)'
          }
        }
      }
    },
    Th: {
      baseStyle: {
        fontWeight: '400'
      }
    }
  },
  config,
  fonts: {
    heading: '\"Work Sans\", Roboto, sans-serif',
    body: '\"Work Sans\", Roboto, sans-serif'
  },
  styles: {
    global: () => ({
      body: {
        bg: '#F5F7FB',
        color: '#112240',
        fontFeatureSettings: '"liga" 1, "kern" 1'
      },
      '::selection': {
        backgroundColor: '#C7D2FF',
        color: '#1C2753'
      }
    }),
  },
  colors: {
    primary: '#556FFF',
    secondary: '#2E3ACA',
    neutral: {
      50: '#F5F7FB',
      100: '#E8ECF5',
      200: '#D4DAEB',
      300: '#BBC4DC',
      400: '#9DA7C9',
      500: '#7B85AF',
      600: '#5E6891',
      700: '#465072',
      800: '#303954',
      900: '#1F273B'
    },
    accent: '#FF8A64'
  }
});

export default theme;
