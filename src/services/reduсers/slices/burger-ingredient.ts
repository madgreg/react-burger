import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngrediensTypes, TInitBurgerIngredientStateType } from "types";
import { bunMenu } from "utils/vars";
import { loadBurgerIngredientRequest } from "../api";

// burgerIngredient API

export const loadBurgerIngredient = createAsyncThunk("burgerIngredient/loadBurgerIngredient", async () => {
    const response = await loadBurgerIngredientRequest();
    const data = await response.json();
    if (data.success) {
        return data.data;
    }
});

export const initBurgerIngredientState: TInitBurgerIngredientStateType = {
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
        setCurrentViewIngredient: (state, action: PayloadAction<string | any>) => {
            const ingridient = state.burgerIngredients.filter((x) => x._id === action.payload)[0];
            state.currentViewIngredient = ingridient ? ingridient : null;
        },
        setTab: (state, action: PayloadAction<string>) => {
            state.currentTab = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadBurgerIngredient.fulfilled, (state, action: PayloadAction<TIngrediensTypes[]>) => {
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
