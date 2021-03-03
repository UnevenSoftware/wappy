const { colors: defaultColors } = require('tailwindcss/defaultTheme')

const colors = { 
    ...defaultColors,
    ...{ // concat custom colors to default ones
        primarydarker: '#075E54',
        primarydark: '#128C7E',
        primarylight: '#25D366',
        accent: '#34B7F1',
        dark: {
          label: '#ffffff',
          text: '#9fa2a5',
          icon: '#B1B3B5',
          
          bg: '#131C21',
          'bglayer-1':'#1c2a31',
          'bglayer-2':'#263741',
          'bglayer-3':'#2f4552',
          
          // recived & sent messages
          bgmessage_recevier: '#262D31',
          bgmessage_receiver_quote: '#20262A',
          bgmessage_sender: '#056162',
          bgmesaage_sender_quote: '#065051',
        },
        light: {
          label: '#0d0d0d',
          text: '#747370',
          icon: '#919191',

          bg: '#dfd8d0',
          'bglayer-1': '#e5ddd5',
          'bglayer-2': '#ebebeb',
          'bglayer-3': '#F0F0F0',

          // reviced & sent messages
          bgmessage_recevier: '#ffffff',
          bgmessage_receiver_quote: '#F0F0F0',
          bgmessage_sender: '#DCF8C6',
          bgmesaage_sender_quote: '#CFE9BA',
        }
    },
}



module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.vue', './src/**/*.js', './src/**/*.ts']
  },
  theme: {
    colors: colors,
    extend: {
      fontFamily: {
        'sans': ['montserrat ', 'Roboto', 'sans-serif']
      },
      scale: {
        '-1': '-1'
      }
    },
  },
  variants: {
    cursor: ['responsive', 'disabled'],
    backgroundColor: ['dark', 'hover', 'disabled'],
    borderColor: ['dark', 'active', 'focus', 'disabled'],
    textColor: ['dark', 'hover', 'active', 'disabled'],
    opacity: ['dark', 'hover', 'active', 'focus', 'disabled']
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  experimental: {
    darkModeVariant: true,
    applyComplexClasses: true,
    uniformColorPalette: true,
    extendedSpacingScale: true,
    defaultLineHeights: true,
    extendedFontSizeScale: true
  },
  dark: 'class'
}
