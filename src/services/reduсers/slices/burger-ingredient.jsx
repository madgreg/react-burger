import { createSlice } from "@reduxjs/toolkit";
import { bunMenu } from "utils/vars";
import { loadBurgerIngredientRequest } from "../api";
import { appReducer } from "./app";

// burgerIngredient API

export const initBurgerIngredientState = {
    isModal: false,
    currentTab: bunMenu,
    burgerIngredients: [],
    currentViewIngredient: null,
};

export const loadBurgerIngredient = () => async (dispatch, getState) => {    
    try {
        const response = await loadBurgerIngredientRequest();
        const data = await response.json();        
        if (data.success) {            
            dispatch(burgerIngredientReducer.actions.setData(data.data));
            dispatch(appReducer.actions.setTmpFg());
        }
    } catch (error) {
        console.log('=error:',error);
    }
};

export const burgerIngredientReducer = createSlice({
    name: "burgerIngredient",
    initialState: initBurgerIngredientState,
    reducers: {
        setModal: (state, action) => {
            state.isModal = action.payload;
        },
        setCurrentViewIngredient: (state, action) => {
            const ingridient = state.burgerIngredients.filter((x) => x._id === action.payload)[0];
            state.currentViewIngredient = ingridient ? ingridient : null;
        },
        setTab: (state, action) => {
            state.currentTab = action.payload;
        },
        setData: (state, action) => {
            state.burgerIngredients = [...action.payload];
        },
    },
});

export const selectIsModal = (state) => state.burgerIngredient.isModal;
export const selectCurrentTab = (state) => state.burgerIngredient.currentTab;
export const selectBurgerIngredients = (state) => state.burgerIngredient.burgerIngredients;
export const selectCurrentViewIngredient = (state) => state.burgerIngredient.currentViewIngredient;
