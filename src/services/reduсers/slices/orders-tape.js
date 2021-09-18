import { createSlice } from "@reduxjs/toolkit";

export const getOrder = (order) => (dispatch, getState) => {
    // const state = getState()
    const URL = "https://norma.nomoreparties.space/api/orders/" + order;
    fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    })
        .then((response) => {
            if (response.status >= 400 && response.status < 600) {
                throw new Error("Bad response from server");
            }
            return response;
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data.orders)
            dispatch(ordersTapeReducer.actions.setCurentOrder(data.orders));
        })
        .catch((error) => {
            console.log(error);
        });
};

const initState = {
    // wsConnected: false,
    curentOrder: null,
    orderList: {},
};

export const ordersTapeReducer = createSlice({
    name: "ordersTapeReducer",
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
        },
        onMessage: (state, action) => {
            
            state.orderList = { ...action.payload };
        },
    },
});
