const { colors: defaultColors } = require('tailwindcss/defaultTheme')

const colors = { 
    ...defaultColors,
    ...{ // concat custom colors to default ones
        transparent: 'transparent',
        watealdark: '#075E54',
        wateal: '#128C7E',
        walightgreen: '#25D366',
        wablue: '#34B7F1'
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
