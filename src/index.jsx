import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import "@ya.praktikum/react-developer-burger-ui-components";
import { Provider } from "react-redux";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { configureStore } from "@reduxjs/toolkit";
import {rootReducer} from "./services/redusers";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
