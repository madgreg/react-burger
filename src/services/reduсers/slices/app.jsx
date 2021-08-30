import { createSlice } from "@reduxjs/toolkit";

const initState = {
    tmpFg: 0,
    isLoad: false,
    activePage: "home",
};

export const appReducer = createSlice({
    name: "appReducer",
    initialState: initState,
    reducers: {
        setTmpFg: (state) => {
            state.tmpFg = state.tmpFg + 1;
            if (state.tmpFg === 2) {
                state.isLoad = true;
            }
        },
        setLoad: (state, action) => {
            state.isLoad = action.payload;
        },
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        },
    },
});
