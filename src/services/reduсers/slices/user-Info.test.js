import {
    forgotPassword,
    initStateUserInfoReducer,
    logIn,
    logout,
    registnration,
    resetPassword,
    selectAccessToken,
    selectEmail,
    selectIsAuth,
    selectName,
    selectRedirectTo,
    updateUserInfo,
    userInfoReducer,
} from "./user-Info";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { updateUserInfoRequest } from "../api";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const actions = userInfoReducer.actions;

describe("userInfoReducer", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it("проверка инициализации стайта при старте редюсера", () => {
        const nextState = initStateUserInfoReducer;
        const result = userInfoReducer.reducer(undefined, {});
        expect(result).toEqual(nextState);
    });

    it("resetState", () => {
        const testValue1 = {
            ...initStateUserInfoReducer,
            redirectTo: 43234,
            isAuth: 12,
        };

        const nextState = userInfoReducer.reducer(testValue1, actions.resetState());
        expect(nextState).toEqual(initStateUserInfoReducer);
    });

    it("setUserInfo", () => {
        const name = "name__";
        const email = "email__";

        const nextState = userInfoReducer.reducer(
            initStateUserInfoReducer,
            actions.setUserInfo({
                name,
                email,
            })
        );
        const rootState = { userInfo: nextState };
        expect(name).toEqual(selectName(rootState));
        expect(email).toEqual(selectEmail(rootState));
    });

    it("setAuth", () => {
        const name = "test";

        const nextState = userInfoReducer.reducer(initStateUserInfoReducer, actions.setAuth(name));
        const rootState = { userInfo: nextState };
        expect(name).toEqual(selectIsAuth(rootState));
    });

    it("setAccessToken", () => {
        const name = "test";

        const nextState = userInfoReducer.reducer(initStateUserInfoReducer, actions.setAccessToken(name));
        const rootState = { userInfo: nextState };
        expect(name).toEqual(selectAccessToken(rootState));
    });

    it("setRedirectTo", () => {
        const name = "test";

        const nextState = userInfoReducer.reducer(initStateUserInfoReducer, actions.setRedirectTo(name));
        const rootState = { userInfo: nextState };
        expect(name).toEqual(selectRedirectTo(rootState));
    });

    it("logIn", async () => {
        const expectedState = {
            success: true,
            accessToken:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2I4MWFjMzYwOGYwMDAxZWI5MmI1NCIsImlhdCI6MTYzMjQ2NzcwNywiZXhwIjoxNjMyNDY4OTA3fQ.qUkf-TOoaz7jZa44Z5jVChFwETlsRmY7z0g2pI5VZ_A",
            refreshToken: "122c683eca78db3897ca48b87f29c71c71df584922dbffbd56638bffd1852b422dec372618cca821",
            user: { email: "miozlhnpbpqioxjvcl@bptfp.net", name: "11" },
        };

        const store = mockStore(initStateUserInfoReducer);
        fetchMock.postOnce("https://norma.nomoreparties.space/api/auth/login", {
            body: expectedState,
        });

        const expectedActions = [
            {
                type: "userInfoReducer/setUserInfo",
                payload: { email: "miozlhnpbpqioxjvcl@bptfp.net", name: "11" },
            },
            { type: "userInfoReducer/setAuth", payload: true },
            {
                type: "userInfoReducer/setAccessToken",
                payload:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2I4MWFjMzYwOGYwMDAxZWI5MmI1NCIsImlhdCI6MTYzMjQ2NzcwNywiZXhwIjoxNjMyNDY4OTA3fQ.qUkf-TOoaz7jZa44Z5jVChFwETlsRmY7z0g2pI5VZ_A",
            },
        ];

        await store.dispatch(logIn());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("updateUserInfo", async () => {
        const expectedState = {
            success: true,
            accessToken:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2I4MWFjMzYwOGYwMDAxZWI5MmI1NCIsImlhdCI6MTYzMjQ2NzcwNywiZXhwIjoxNjMyNDY4OTA3fQ.qUkf-TOoaz7jZa44Z5jVChFwETlsRmY7z0g2pI5VZ_A",
            refreshToken: "122c683eca78db3897ca48b87f29c71c71df584922dbffbd56638bffd1852b422dec372618cca821",
            user: { email: "miozlhnpbpqioxjvcl@bptfp.net", name: "11" },
        };

        const store = mockStore(initStateUserInfoReducer);
        fetchMock.patchOnce("https://norma.nomoreparties.space/api/auth/user", {
            body: expectedState,
        });

        const expectedActions = [
            {
                type: "userInfoReducer/setUserInfo",
                payload: { email: "miozlhnpbpqioxjvcl@bptfp.net", name: "11" },
            },
        ];

        await store.dispatch(updateUserInfo());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("logout", async () => {
        const expectedState = {
            success: true,
        };

        const store = mockStore(initStateUserInfoReducer);
        fetchMock.postOnce("https://norma.nomoreparties.space/api/auth/logout", {
            body: expectedState,
        });

        const expectedActions = [
            { type: "userInfoReducer/resetState" },
            { type: "userInfoReducer/setAuth", payload: false },
        ];

        await store.dispatch(logout());
        
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("resetPassword", async () => {
        const expectedState = {
            success: true,
        };

        const store = mockStore(initStateUserInfoReducer);
        fetchMock.postOnce("https://norma.nomoreparties.space/api/password-reset/reset", {
            body: expectedState,
        });

        const expectedActions = [ { type: 'userInfoReducer/setRedirectTo', payload: '/login' } ];

        await store.dispatch(resetPassword({}));
        // console.log(store.getActions())
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("forgotPassword", async () => {
        const expectedState = {
            success: true,
        };

        const store = mockStore(initStateUserInfoReducer);
        fetchMock.postOnce("https://norma.nomoreparties.space/api/password-reset", {
            body: expectedState,
        });

        const expectedActions = [ { type: 'userInfoReducer/setRedirectTo', payload: '/reset-password' } ];

        await store.dispatch(forgotPassword());
        // console.log(store.getActions())
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("registnration", async () => {
        const expectedState = {
            success: true,
            accessToken: 'test'
        };

        const store = mockStore(initStateUserInfoReducer);
        fetchMock.postOnce("https://norma.nomoreparties.space/api/auth/register", {
            body: expectedState,
        });

        const expectedActions = [ { type: 'userInfoReducer/setAccessToken', payload: undefined }];

        await store.dispatch(registnration({}));
        // console.log("----------",store.getActions())
        expect(store.getActions()).toEqual(expectedActions);
    });

});
