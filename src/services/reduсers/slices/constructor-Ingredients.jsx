import { createSlice } from "@reduxjs/toolkit";
import { appReducer } from "./app";

// constructorIngredients API

export const burgerIngredientInitState = {
    orderSum: 0,
    orderId: null,
    order: {
        bun: [],
        ingredients: [],
    },
};

export const sendOrder = (order) => (dispatch, getState) => {
    
    const state = getState()
    const URL = "https://norma.nomoreparties.space/api/orders";
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + state.userInfo.accessToken,
        },
        body: JSON.stringify({ ingredients: order.bun.concat(order.ingredients).map((x) => x._id) }),
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
            dispatch(appReducer.actions.setLoad(true));
            dispatch(burgerIngredientConstructorReducer.actions.setOrderId(data.order.number));
        })
        .catch((error) => {
            console.log(error);
        });
};

export const burgerIngredientConstructorReducer = createSlice({
    name: "burgerIngredientConstructor",
    initialState: burgerIngredientInitState,
    reducers: {
        resetOrder: (state) => {
            state.orderSum = burgerIngredientInitState.orderSum;
            state.orderId = burgerIngredientInitState.orderId;
            state.order = burgerIngredientInitState.order;
            // state = burgerIngredientInitState
        },
        setOrderId: (state, action) => {
            state.orderId = action.payload;
        },
        resetSummOrder: (state) => {
            state.orderSum = burgerIngredientInitState.orderSum;
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
        addIngredient: (state, action) => {
            if (action.payload.type === "bun") {
                state.order.bun = [action.payload, action.payload];
            } else {
                state.order.ingredients = [...state.order.ingredients, action.payload];
            }
        },
        delIngredient: (state, action) => {
            state.order.ingredients.splice(action.payload, 1);
        },
        chagneIngredientPosition: (state, action) => {
            let newI = [...state.order.ingredients];
            newI[action.payload.dragIndex] = state.order.ingredients[action.payload.hoverIndex];
            newI[action.payload.hoverIndex] = state.order.ingredients[action.payload.dragIndex];
            state.order.ingredients = newI;
        },
    },
});

export const selectOrderSum = (state) => state.burgerIngredientConstructor.orderSum;
export const selectOrderId = (state) => state.burgerIngredientConstructor.orderId;
export const selectOrder = (state) => state.burgerIngredientConstructor.order;