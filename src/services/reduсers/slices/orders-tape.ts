import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TGetOrderTapeResponse, TInitStateOrdersTapeReducerType, TOrderType } from "types";
import { getOrderRequest } from "../api";

export const getOrder = createAsyncThunk("ordersTapeReducer/getOrder", async (order: number) => {
    const response = await getOrderRequest(order);
    const data = await response.json();
    if (data.success) {
        return data;
    }
});

export const initStateOrdersTapeReducer: TInitStateOrdersTapeReducerType = {
    curentOrder: null,
    orderList: [],
    total: null, 
    totalToday: null
};

export const ordersTapeReducer = createSlice({
    name: "ordersTapeReducer",
    initialState: initStateOrdersTapeReducer,
    reducers: {
        setCurentOrder: (state, action: PayloadAction<TOrderType>) => {
            state.curentOrder = { ...action.payload };
        },
        onMessage: (state, action: PayloadAction<TGetOrderTapeResponse>) => {
            state.orderList = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOrder.fulfilled, (state, action: PayloadAction<TGetOrderTapeResponse>) => {            
            state.curentOrder = action.payload.orders[0];
            // state.total = action.payload.total;
            // state.totalToday = action.payload.totalToday;
        });
    },
});

export const selectOrderList = (state) => state.ordersTape.orderList;
export const selectCurentOrder = (state) => state.ordersTape.curentOrder;
