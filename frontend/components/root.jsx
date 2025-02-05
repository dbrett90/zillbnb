import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter } from "react-router-dom";
import App from "./App";

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
console.log("THIS IS A TEST FROM ROOT.JSX");

export default Root;