import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import "@ya.praktikum/react-developer-burger-ui-components";
import { Provider } from "react-redux";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "services/store";



ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
