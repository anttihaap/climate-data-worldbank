import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { combineReducers } from "redux";

import App from "./App";
import compareCountriesReducer from "./reducers/compareCountriesReducer.js";
import compareYearsReducer from "./reducers/compareYearsReducer";

import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(
  combineReducers({
    compareCountries: compareCountriesReducer,
    compareYears: compareYearsReducer
  })
);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
};

render();
