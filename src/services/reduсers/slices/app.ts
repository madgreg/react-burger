import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitappReducerStateType } from "types";

const initState: TInitappReducerStateType = {
    tmpFg: 0,
    isLoad: false,
    activePage: "home",
};

export const appReducer = createSlice({
    name: "appReducer",
    initialState: initState,
    reducers: {
        setTmpFg: (state) => {
            state.isLoad = true;
            // state.tmpFg = state.tmpFg + 1;
            // if (state.tmpFg === 1) {
            //     state.isLoad = true;
            // }
        },
        setLoad: (state, action: PayloadAction<boolean>) => {
            state.isLoad = action.payload;
        },
        setActivePage: (state, action: PayloadAction<string>) => {
            state.activePage = action.payload;
        },
    },
});


export const selectAppInfoIsLoad = (state) => state.appInfo.isLoad;