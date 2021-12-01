import 'preact/devtools';
import { render } from 'preact'
import { App } from './app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'
import '@fontsource/karla/400.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const theme = extendTheme({
  fonts: {
    heading: 'Karla',
    body: 'Karla',
  },
  config: {
    initialColorMode: 'dark'
  }
});


render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('app'))
