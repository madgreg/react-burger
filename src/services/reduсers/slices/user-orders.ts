import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrderType, TUserOrdersReducerInitStateType } from "types";

export const userOrdersReducerInitState: TUserOrdersReducerInitStateType = {
    curentOrder: null,
};

export const userOrdersReducer = createSlice({
    name: "userOrdersReducer",
    initialState: userOrdersReducerInitState,
    reducers: {
        setCurentOrder: (state, action: PayloadAction<TOrderType>) => {
            state.curentOrder = { ...action.payload };
        },
    },
});

export const selectCurentOrder = (state) => state.userOrders.curentOrder; 

