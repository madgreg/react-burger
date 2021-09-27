import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TGetOrderTapeResponse, TInitStateOrdersTapeReducerType, TOrderType } from "types";
import { getOrderRequest } from "../api";

export const getOrder = createAsyncThunk("ordersTapeReducer/getOrder", async (order:number) => {
    try {
        const response = await getOrderRequest(order);
        const data = await response.json();
        if (data.success) {
            return data;
        }
    } catch (error) {
        console.log("=error:", error);
    }
});

export const initStateOrdersTapeReducer: TInitStateOrdersTapeReducerType = {
    curentOrder: null,
    orderList: [],
};

export const ordersTapeReducer = createSlice({
    name: "ordersTapeReducer",
    initialState: initStateOrdersTapeReducer,
    reducers: {
        setCurentOrder: (state, action: PayloadAction<TOrderType>) => {
            state.curentOrder = { ...action.payload };
        },
        onMessage: (state, action: PayloadAction<TOrderType[]>) => {
            state.orderList =  action.payload;
        },
    },
    extraReducers: (builder) => {
        builder            
            .addCase(getOrder.fulfilled, (state, action: PayloadAction<TGetOrderTapeResponse>) => {
                state.curentOrder = { ...action.payload.orders[0] };
            });
    },
});

export const selectOrderList = (state) => state.ordersTape.orderList;
export const selectCurentOrder = (state) => state.ordersTape.curentOrder;
