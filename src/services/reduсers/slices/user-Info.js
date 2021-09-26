import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "utils/funcs";
import {
    forgotPasswordRequest,
    getUserInfoRequest,
    loginRequest,
    logoutRequest,
    refreshTokenRequest,
    registerRequest,
    resetPasswordRequest,
    updateUserInfoRequest,
} from "../api";
import { appReducer } from "./app";
// import { appReducer } from "./app";

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
                            dispatch(appReducer.actions.setTmpFg());
                            // dispatch(appReducer.actions.setLoad(true));
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
        dispatch(appReducer.actions.setTmpFg());
        // dispatch(appReducer.actions.setLoad(true));
    }
};

export const logIn = (form) => (dispatch, getState) => {
    return loginRequest(form)
        .then((response) => {            
            return response.json();
        })
        .then((data) => {
            if (data.success) {
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
    return registerRequest(form)
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
    return forgotPasswordRequest(form)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                dispatch(userInfoReducer.actions.setRedirectTo("/reset-password"));
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

export const resetPassword = (form) => (dispatch, getState) => {
    return resetPasswordRequest(form)
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

export const logout = () => (dispatch, getState) => {
    return logoutRequest()
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                dispatch(userInfoReducer.actions.resetState());
                deleteCookie("refreshToken");
                dispatch(userInfoReducer.actions.setAuth(false));
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

export const updateUserInfo = (form, token) => (dispatch, getState) => {
    return updateUserInfoRequest(form, token)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                dispatch(userInfoReducer.actions.setUserInfo(data.user));
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

export const initStateUserInfoReducer = {
    redirectTo: null,
    isAuth: false,
    name: null,
    email: null,
    accessToken: null,
};

export const userInfoReducer = createSlice({
    name: "userInfoReducer",
    initialState: initStateUserInfoReducer,
    reducers: {
        resetState: (state) => {
            // state = { ...initStateUserInfoReducer };
            state.redirectTo = initStateUserInfoReducer.redirectTo
            state.isAuth = initStateUserInfoReducer.isAuth
            state.name = initStateUserInfoReducer.name
            state.email = initStateUserInfoReducer.email
            state.accessToken = initStateUserInfoReducer.accessToken
        },
        // loginRes: (state, action) => {
        //     state = { ...state, ...action.payload };
        // },
        setUserInfo: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRedirectTo: (state, action) => {
            state.redirectTo = action.payload;
        },
    },
});

export const selectRedirectTo = (state) => state.userInfo.redirectTo;
export const selectIsAuth = (state) => state.userInfo.isAuth;
export const selectName = (state) => state.userInfo.name;
export const selectEmail = (state) => state.userInfo.email;
export const selectAccessToken = (state) => state.userInfo.accessToken;
