import { configureStore } from "@reduxjs/toolkit";
import { creatrSocketMiddleware } from "./middleware/socket-middleware";
import { rootReducer } from "./reduсers/root-reduser";

export const store = configureStore({ 
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(creatrSocketMiddleware()),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootStore = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
 