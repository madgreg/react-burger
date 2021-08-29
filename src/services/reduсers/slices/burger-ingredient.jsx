import { createSlice } from "@reduxjs/toolkit";
import { bunMenu } from "utils/vars";
import { appReducer } from "./app";


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
            dispatch(appReducer.actions.setLoad(true));
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
            const ingridient = state.burgerIngredients.filter(x=>x._id===action.payload)[0]
            console.log(ingridient)
            state.currentViewIngredient = ingridient;
        },
        setTab: (state, action) => {
            state.currentTab = action.payload;
        },
        setData: (state, action) => {
            state.burgerIngredients = [...action.payload];
        },
    },
});