import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import "antd/dist/antd.css";
import "react-image-gallery/styles/css/image-gallery.css";


const app = (
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
  </Provider>
); 

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();