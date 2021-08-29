import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isLoad: false,
    activePage: 'home'
};

export const appReducer = createSlice({
    name: "appReducer",
    initialState: initState,
    reducers: {
        setLoad:(state,action)=>{
            state.isLoad = action.payload;
        },
        setActivePage:(state,action)=>{
            state.activePage = action.payload;
        }
    },
});