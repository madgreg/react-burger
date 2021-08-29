import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isLoad: false
};

export const appReducer = createSlice({
    name: "appReducer",
    initialState: initState,
    reducers: {
        setLoad:(state,action)=>{
            state.isLoad = action.payload;
        }
    },
});