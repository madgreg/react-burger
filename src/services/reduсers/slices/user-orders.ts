import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { orderType, userOrdersReducerInitStateType } from "types";

export const userOrdersReducerInitState: userOrdersReducerInitStateType = {
    curentOrder: null,
};

export const userOrdersReducer = createSlice({
    name: "userOrdersReducer",
    initialState: userOrdersReducerInitState,
    reducers: {
        setCurentOrder: (state, action: PayloadAction<orderType>) => {
            state.curentOrder = { ...action.payload };
        },
    },
});

export const selectCurentOrder = (state) => state.userOrders.curentOrder;

