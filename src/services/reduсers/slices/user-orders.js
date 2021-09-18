import { createSlice } from "@reduxjs/toolkit";

const initState = {
    // wsConnected: false,
    curentOrder: null,
    orderList: {},
};

export const userOrdersReducer = createSlice({
    name: "userOrdersReducer",
    initialState: initState,
    reducers: {
        // onOpen: (state) => {
        //     state.wsConnected = true;
        // },
        // onError: (state) => {
        //     state.wsConnected = false;
        // },
        // onClose: (state) => {
        //     state.wsConnected = false;
        // },
        setCurentOrder: (state, action) => {
            state.curentOrder = { ...action.payload };
        }
    },
});
