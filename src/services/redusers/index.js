import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { bunMenu } from "utils/vars";

// burgerIngredient API

const initBurgerIngredientState = {
    currentTab: bunMenu,
    burgerIngredients: [],
    currentViewIngredient: null,
};

export const loadBurgerIngredient = () => (dispatch, getState) => {
    const URL = "https://norma.nomoreparties.space/api/ingredients";
    fetch(URL)
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
            dispatch(burgerIngredientReducer.actions.setData(data.data));
        })
        .catch((error) => {
            console.log(error);
        });
};

export const burgerIngredientReducer = createSlice({
    name: "burgerIngredient",
    initialState: initBurgerIngredientState,
    reducers: {
        setCurrentViewIngredient: (state, action) => {            
            state.currentViewIngredient = action.payload;
        },
        setTab: (state, action) => {
            state.currentTab = action.payload;
        },
        setData: (state, action) => {
            state.burgerIngredients = [...action.payload];
        },
    },
});

// constructorIngredients API

const initState = {
    orderSum: 0,
    orderId: null,
    order: {
        bun: [],
        ingredients: [],
    },
};

export const sendOrder = (order) => (dispatch) => {
    const URL = "https://norma.nomoreparties.space/api/orders";
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
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
            dispatch(burgerIngredientConstructorReducer.actions.setOrderId(data.order.number));
        })
        .catch((error) => {
            console.log(error);
        });
};

export const burgerIngredientConstructorReducer = createSlice({
    name: "burgerIngredientConstructor",
    initialState: initState,
    reducers: {
        resetOrder: (state) => {
            state.orderSum = initState.orderSum;
            state.orderId = initState.orderId;
            state.order = initState.order;
        },
        setOrderId: (state, action) => {
            state.orderId = action.payload;
        },
        resetSummOrder: (state) => {
            state.orderSum = initState.orderSum;
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

// rootReduser
export const rootReducer = combineReducers({
    burgerIngredient: burgerIngredientReducer.reducer,
    burgerIngredientConstructor: burgerIngredientConstructorReducer.reducer,
});
