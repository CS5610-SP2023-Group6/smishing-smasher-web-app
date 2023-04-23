import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/posts-reducer";
import authReducer from "./reducers/auth-reducer";
import searchReducer from "./reducers/search-reducer";
import "./vendors/bootstrap/css/bootstrap.min.css";

const store = configureStore({
  reducer: { postsData: postsReducer, auth: authReducer, search: searchReducer },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="453711346264-amknu166dfhhd97j5b4ket9nohicfdbj.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
