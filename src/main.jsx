import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {legacy_createStore as createStore} from 'redux'
import rootReducer from './Redux/RootReducer.js'


const storageRedux=createStore(rootReducer)


ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={storageRedux}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
 </Provider>
  ,
)
