import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middleware/socket-middleware";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSE_AUTH, WS_CONNECTION_START, WS_CONNECTION_START_AUTH } from "./reduсers/actions";
import { rootReducer } from "./reduсers/root-reduser";

const wsActions1 = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: "",
    onOpen: "",
    onClose: WS_CONNECTION_CLOSE,
    onError: "",
    onMessage: 'ordersTapeReducer/onMessage',
};

const wsActions2 = {
    wsInit: WS_CONNECTION_START_AUTH,
    wsSendMessage: '',
    onOpen: "",
    onClose: WS_CONNECTION_CLOSE_AUTH,
    onError: "",
    onMessage: 'ordersTapeReducer/onMessage',
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsActions1)).concat(socketMiddleware(wsActions2)),
    devTools: process.env.NODE_ENV !== "production",
});
