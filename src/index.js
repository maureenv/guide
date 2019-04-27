import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import './res/css/tailwind.css'

import App from './App'


ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
document.getElementById('root'))
