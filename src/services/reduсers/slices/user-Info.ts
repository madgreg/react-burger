import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    TInitStateUserInfoReducerType,
    TLogInResponse,
    TRefreshTokenResponse,
    TRegistrationFormType,
    TResetPaswordForm,
    TUpdateUserInforArg,
    TUpdateUserInfoResponse,
    TUserInfoArg,
} from "types";
import { deleteCookie, setCookie } from "utils/funcs";
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

export const getUserInfo = createAsyncThunk("userInfoReducer/getUserInfo", async (tmp = undefined, thunkApi) => {
    try {
        const store: any = thunkApi.getState();
        const response = await getUserInfoRequest(store.userInfo.accessToken);
        const data = await response.json();
        if (data.success) {
            thunkApi.dispatch(appReducer.actions.setTmpFg());
            return data;
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log("=error:", error);
    }
});

export const appStart = createAsyncThunk("userInfoReducer/appStart", async (tmp = undefined, { dispatch }) => {
    try {
        const response = await refreshTokenRequest();
        const data = await response.json();
        if (data.success) {
            setTimeout(() => {
                dispatch(getUserInfo());
            }, 200);
            return data;
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log("=error:", error);
    }
});

export const logIn = createAsyncThunk("userInfoReducer/logIn", async (form) => {
    try {
        const response = await loginRequest(form);
        const data = await response.json();
        if (data.success) {
            return data;
        }
    } catch (error) {
        console.log("=error:", error);
    }
});

export const registnration = createAsyncThunk("userInfoReducer/registnration", async (form: TRegistrationFormType) => {
    try {
        const response = await registerRequest(form);
        const data = await response.json();
        if (data.success) {
            return data;
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log("=error:", error);
    }
});

export const forgotPassword = createAsyncThunk("userInfoReducer/forgotPassword", async (form) => {
    try {
        const response = await forgotPasswordRequest(form);
        const data = await response.json();
        if (data.success) {
            return data;
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log("=error:", error);
    }
});

export const resetPassword = createAsyncThunk("userInfoReducer/resetPassword", async (form: TResetPaswordForm) => {
    try {
        const response = await resetPasswordRequest(form);
        const data = await response.json();
        if (data.success) {
            return data;
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log("=error:", error);
    }
});

export const logout = createAsyncThunk("userInfoReducer/logout", async () => {
    try {
        const response = await logoutRequest();
        const data = await response.json();
        if (data.success) {
            return data;
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log("=error:", error);
    }
});

export const updateUserInfo = createAsyncThunk("userInfoReducer/updateUserInfo", async (args: TUpdateUserInforArg) => {
    try {
        const response = await updateUserInfoRequest(args.form, args.accessToken);
        const data = await response.json();
        if (data.success) {
            return data;
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log("=error:", error);
    }
});

export const initStateUserInfoReducer: TInitStateUserInfoReducerType = {
    isLoad: false,
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
            state.redirectTo = initStateUserInfoReducer.redirectTo;
            state.isAuth = initStateUserInfoReducer.isAuth;
            state.name = initStateUserInfoReducer.name;
            state.email = initStateUserInfoReducer.email;
            state.accessToken = initStateUserInfoReducer.accessToken;
        },
        setUserInfo: (state, action: PayloadAction<TUserInfoArg>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setRedirectTo: (state, action: PayloadAction<string>) => {
            state.redirectTo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.fulfilled, (state, action: PayloadAction<TLogInResponse>) => {
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.isAuth = true;
                state.accessToken = action.payload.accessToken.split(" ")[1];
                setCookie("refreshToken", action.payload.refreshToken);
            })
            .addCase(registnration.fulfilled, (state, action: PayloadAction<TLogInResponse>) => {
                setCookie("refreshToken", action.payload.refreshToken);
                state.accessToken = action.payload.accessToken.split(" ")[1];
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.redirectTo = "/reset-password";
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.redirectTo = "/login";
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoad = initStateUserInfoReducer.isLoad;
                state.redirectTo = initStateUserInfoReducer.redirectTo;
                state.isAuth = initStateUserInfoReducer.isAuth;
                state.name = initStateUserInfoReducer.name;
                state.email = initStateUserInfoReducer.email;
                state.accessToken = initStateUserInfoReducer.accessToken;
                state.isAuth = false;
                deleteCookie("refreshToken");
            })
            .addCase(updateUserInfo.fulfilled, (state, action: PayloadAction<TUpdateUserInfoResponse>) => {
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
            })
            .addCase(appStart.fulfilled, (state, action: PayloadAction<TRefreshTokenResponse>) => {
                setCookie("refreshToken", action.payload.refreshToken);
                state.accessToken = action.payload.accessToken.split(" ")[1];
            })
            .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<TUpdateUserInfoResponse>) => {
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.isAuth = true;
                // dispatch(appReducer.actions.setTmpFg());
            });
    },
});

export const selectRedirectTo = (state) => state.userInfo.redirectTo;
export const selectIsAuth = (state) => state.userInfo.isAuth;
export const selectName = (state) => state.userInfo.name;
export const selectEmail = (state) => state.userInfo.email;
export const selectAccessToken = (state) => state.userInfo.accessToken;
