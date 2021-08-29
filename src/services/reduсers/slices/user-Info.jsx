import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "utils/funcs";
import { forgotPasswordRequest, getUserInfoRequest, loginRequest, refreshTokenRequest, registerRequest, resetPasswordRequest } from "../api";
import { appReducer } from "./app";

export const appStart = () => (dispatch, getState) => {
    // если авторизировались раньше, получаем свежий токен
    // и информацию о пользователе
    if (getCookie("refreshToken")) {
        refreshTokenRequest()
            // .then((response) => response.json())
            .then((res) => {
                if (res.success) {
                    // сохраняем свежие токены
                    setCookie("refreshToken", res.refreshToken);
                    const accessToken = res.accessToken.split(" ")[1];
                    dispatch(userInfoReducer.actions.setAccessToken(accessToken));

                    // загружаем инвормацию о пользователе
                    getUserInfoRequest(accessToken).then((data) => {
                        if (data.success) {
                            dispatch(userInfoReducer.actions.setUserInfo(data.user));
                            dispatch(userInfoReducer.actions.setAuth(true));
                            dispatch(appReducer.actions.setLoad(true));
                        } else {
                            console.log(data.message);
                        }
                    });
                    // dispatch(userInfoReducer.actions.setAccessToken(res.accessToken.split(" ")[1]));
                } else {
                    console.log(res.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        dispatch(userInfoReducer.actions.setAuth(false));
        dispatch(appReducer.actions.setLoad(true));
    }
};

export const logIn = (form) => (dispatch, getState) => {
    loginRequest(form)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                // dispatch(userInfoReducer.actions.loginRes({
                //     ...data.user, isAuth: true, accessToken: data.accessToken.split(" ")[1]
                // }))
                dispatch(userInfoReducer.actions.setUserInfo(data.user));
                dispatch(userInfoReducer.actions.setAuth(true));                
                dispatch(userInfoReducer.actions.setAccessToken(data.accessToken.split(" ")[1]));
                setCookie("refreshToken", data.refreshToken);
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

export const registnration = (form) => (dispatch, getState) => {
    registerRequest(form)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                setCookie("refreshToken", data.refreshToken);
                dispatch(userInfoReducer.actions.setAccessToken(data.accessToken.split(" ")[1]));
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

export const forgotPassword = (form) => (dispatch, getState) => {
    forgotPasswordRequest(form)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                dispatch(userInfoReducer.actions.setRedirectTo("/reset-password" ));
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

export const resetPassword = (form) => (dispatch, getState) => {
    resetPasswordRequest(form)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                dispatch(userInfoReducer.actions.setRedirectTo("/login"));
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

const initState = {
    redirectTo: null,    
    isAuth: false,
    name: null,
    email: null,
    accessToken: null,
};

export const userInfoReducer = createSlice({
    name: "userInfoReducer",
    initialState: initState,
    reducers: {
        loginRes: (state, action) => {
            state = { ...state, ...action.payload };
        },
        setUserInfo: (state, action) => {
            state = { ...state, name: action.payload.name, email: action.payload.email };
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRedirectTo: (state, action) => {
            state.redirectTo = action.payload;
        }        
    },
});
