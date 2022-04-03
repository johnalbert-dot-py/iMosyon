import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './root.css'

const imosyon_theme = {
  dark: {
    primary: "#2F3134",
    secondary: "#191A1B",
  },
  white: {
    primary: "#Fdfdfd",
    secondary: "#fff"
  },
  fonts: {
    heading: "Poppins, sans-serif",
    main: "Noto Sans, sans-serif"
  }
}

const theme = extendTheme({ imosyon_theme })

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
