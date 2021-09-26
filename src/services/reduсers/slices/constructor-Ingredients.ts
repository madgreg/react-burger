import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { burgerIngredientConstructorInitStateType, ingrediensPropTypes, orderSendResponse, OrderSort, sendOrderArg } from "types";
import { sendOrderRequest } from "../api";

// constructorIngredients API

export const sendOrder = createAsyncThunk("burgerIngredientConstructor/sendOrder", async (orderArg: sendOrderArg) => {
    try {
        const response = await sendOrderRequest(orderArg.order, orderArg.accessToken);
        const data = await response.json();
        if (data.success) {
            return data;
        }
    } catch (error) {
        console.log("=error:", error);
    }
});

export const burgerIngredientConstructorInitState: burgerIngredientConstructorInitStateType = {
    isLoad: false,
    orderSum: 0,
    orderId: null,
    order: {
        bun: [],
        ingredients: [],
    },
};

export const burgerIngredientConstructorReducer = createSlice({
    name: "burgerIngredientConstructor",
    initialState: burgerIngredientConstructorInitState,
    reducers: {
        resetOrder: (state) => {
            state.orderSum = burgerIngredientConstructorInitState.orderSum;
            state.orderId = burgerIngredientConstructorInitState.orderId;
            state.order = burgerIngredientConstructorInitState.order;
        },
        setIsLoad: (state, action: PayloadAction<boolean>) => {
            state.isLoad = action.payload;
        },
        setOrderId: (state, action: PayloadAction<number>) => {
            state.orderId = action.payload;
        },
        resetSummOrder: (state) => {
            state.orderSum = burgerIngredientConstructorInitState.orderSum;
        },
        setSummOrder: (state) => {
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            state.orderSum = state.order.bun
                .concat(state.order.ingredients)
                .map((x) => {
                    return x.price;
                })
                .reduce(reducer);
        },
        addIngredient: (state, action: PayloadAction<ingrediensPropTypes>) => {
            if (action.payload.type === "bun") {
                state.order.bun = [action.payload, action.payload];
            } else {
                state.order.ingredients = [...state.order.ingredients, action.payload];
            }
        },
        delIngredient: (state, action: PayloadAction<number>) => {
            state.order.ingredients.splice(action.payload, 1);
        },
        chagneIngredientPosition: (state, action: PayloadAction<OrderSort>) => {
            let newI = [...state.order.ingredients];
            newI[action.payload.dragIndex] = state.order.ingredients[action.payload.hoverIndex];
            newI[action.payload.hoverIndex] = state.order.ingredients[action.payload.dragIndex];
            state.order.ingredients = newI;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOrder.pending, (state) => {
                state.isLoad = true;
            })
            .addCase(sendOrder.fulfilled, (state, action: PayloadAction<orderSendResponse>) => {
                state.isLoad = false;                
                state.orderId = action.payload.order.number;
            });
    },
});

export const selectBIConstructorIsLoad = (store) => store.burgerIngredientConstructor.isLoad;
export const selectOrderSum = (store) => store.burgerIngredientConstructor.orderSum;
export const selectOrderId = (store) => store.burgerIngredientConstructor.orderId;
export const selectOrder = (store) => store.burgerIngredientConstructor.order;
