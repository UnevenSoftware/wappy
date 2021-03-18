import { defineConfig } from 'vite-plugin-windicss'

const colors = {
  primarydarker: '#075E54',
  primarydark: '#128C7E',
  primarylight: '#25D366',
  accent: '#34B7F1',
  dark: {
    label: '#ffffff',
    text: '#F3F4F6',
    icon: '#E5E7EB',

    bg: '#131C21',
    'bglayer-1': '#1c2a31',
    'bglayer-2': '#263741',
    'bglayer-3': '#2f4552',

    // recived & sent messages
    bgmessage_recevier: '#262D31',
    bgmessage_receiver_quote: '#20262A',
    bgmessage_sender: '#056162',
    bgmessage_sender_quote: '#065051',
  },
  light: {
    label: '#0d0d0d',
    text: '#1F2937',
    icon: '#374151',

    bg: '#dfd8d0',
    'bglayer-1': '#e5ddd5',
    'bglayer-2': '#ebebeb',
    'bglayer-3': '#F0F0F0',

    // reviced & sent messages
    bgmessage_recevier: '#ffffff',
    bgmessage_receiver_quote: '#F0F0F0',
    bgmessage_sender: '#DCF8C6',
    bgmessage_sender_quote: '#CFE9BA',
  }
}


export default defineConfig({
  darkMode: 'class',
  theme: {
    colors,
    backgroundImage: {
      'dark-pattern': "url('./public/bg-dark.png')",
      'light-pattern': "url('./public/bg-light.png')"
    },
    scale: {
      'n1': '-1',
    },
    fontFamily: {
      'sans': 'Montserrat, Roboto, sans-serif'
    },
  },
})
