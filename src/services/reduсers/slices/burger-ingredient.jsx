import { createSlice } from "@reduxjs/toolkit";
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