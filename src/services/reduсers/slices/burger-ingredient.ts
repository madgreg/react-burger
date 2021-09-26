import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ingrediensPropTypes, initBurgerIngredientStateType } from "types";
import { bunMenu } from "utils/vars";
import { loadBurgerIngredientRequest } from "../api";

// burgerIngredient API

export const loadBurgerIngredient = createAsyncThunk("burgerIngredient/loadBurgerIngredient", async () => {
    try {
        const response = await loadBurgerIngredientRequest();
        const data = await response.json();
        if (data.success) {
            return data.data;
        }
    } catch (error) {
        console.log("=error:", error);
    }
});

export const initBurgerIngredientState: initBurgerIngredientStateType = {
    isModal: false,
    currentTab: bunMenu,
    burgerIngredients: [],
    currentViewIngredient: null,
    isLoad: false,
};

export const burgerIngredientReducer = createSlice({
    name: "burgerIngredient",
    initialState: initBurgerIngredientState,
    reducers: {
        setModal: (state, action: PayloadAction<boolean>) => {
            state.isModal = action.payload;
        },
        setCurrentViewIngredient: (state, action: PayloadAction<string>) => {
            const ingridient = state.burgerIngredients.filter((x) => x._id === action.payload)[0];
            state.currentViewIngredient = ingridient ? ingridient : null;
        },
        setTab: (state, action: PayloadAction<string>) => {
            state.currentTab = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadBurgerIngredient.fulfilled, (state, action: PayloadAction<ingrediensPropTypes[]>) => {
            state.burgerIngredients = [...action.payload];
            state.isLoad = true;
        });
    },
});

export const selectIsLoadBI = (store) => store.burgerIngredient.isLoad;
export const selectIsModal = (store) => store.burgerIngredient.isModal;
export const selectCurrentTab = (store) => store.burgerIngredient.currentTab;
export const selectBurgerIngredients = (store) => store.burgerIngredient.burgerIngredients;
export const selectCurrentViewIngredient = (store) => store.burgerIngredient.currentViewIngredient;
