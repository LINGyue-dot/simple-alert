import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AlertSdk from "./AlertSDK/core";
import "antd/dist/reset.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

AlertSdk.init({
  project: process.env.REACT_APP_PROJECT!,
  env: process.env.NODE_ENV!,
  version: process.env.REACT_APP_VERSION!,
  baseUrl: process.env.REACT_APP_BASEURL!,
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
