import { createSlice } from "@reduxjs/toolkit";

export const userOrdersReducerInitState = {    
    curentOrder: null,    
};

export const userOrdersReducer = createSlice({
    name: "userOrdersReducer",
    initialState: userOrdersReducerInitState,
    reducers: {
        setCurentOrder: (state, action) => {
            state.curentOrder = { ...action.payload };
        }
    },
});


export const selectCurentOrder = (state) => state.userOrders.curentOrder;