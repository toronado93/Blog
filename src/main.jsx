import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { store } from "./store/store.jsx";
import { Provider } from "react-redux";

import { fetchUsers } from "./slices/usersSlice.jsx";

// we want user is filled , when app first mounted.
store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
