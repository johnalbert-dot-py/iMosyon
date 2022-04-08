import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { BrowserRouter } from 'react-router-dom'

import './root.css'

// const imosyon_theme = {
//   dark: {
//     primary: "#2F3134",
//     secondary: "#191A1B",
//   },
//   white: {
//     primary: "#Fdfdfd",
//     secondary: "#fff"
//   },
//   fonts: {
//     heading: "Poppins, sans-serif",
//     main: "Noto Sans, sans-serif"
//   },
// }

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
