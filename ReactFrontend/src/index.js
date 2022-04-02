import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
} from "react-router-dom" 
import App from './App'
import {
  RecoilRoot
} from 'recoil'

const renderApp = () => {
  ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    <Router>
      <App />   
    </Router>
    </RecoilRoot>
  </React.StrictMode>
  ,
  
  document.getElementById('root'))
}
renderApp()
