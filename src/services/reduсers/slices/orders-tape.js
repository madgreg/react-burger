import { createSlice } from "@reduxjs/toolkit";
import { getOrderRequest } from "../api";

export const getOrder = (order) => async (dispatch, getState) => {
    // const state = getState()
    const response = await getOrderRequest(order);    
    const data = await response.json();
    
    if (data.success) {     
        dispatch(ordersTapeReducer.actions.setCurentOrder(data.orders));    
    }
};

export const initStateOrdersTapeReducer = {    
    curentOrder: null,
    orderList: [],
};

export const ordersTapeReducer = createSlice({
    name: "ordersTapeReducer",
    initialState: initStateOrdersTapeReducer,
    reducers: {
        setCurentOrder: (state, action) => {
            state.curentOrder = { ...action.payload };
        },
        onMessage: (state, action) => {            
            state.orderList = { ...action.payload };
        },
    },
});


export const selectOrderList = (state) => state.ordersTape.orderList;
export const selectCurentOrder = (state) => state.ordersTape.curentOrder;