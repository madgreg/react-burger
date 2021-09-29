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
import { TInitStateUserInfoReducerType, TLoginForm, TRegistrationFormType, TResetPaswordForm } from "types";
import { mainUrl } from "utils/vars";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const actions = userInfoReducer.actions;

describe("userInfoReducer", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it("проверка инициализации стайта при старте редюсера", () => {
        const nextState = initStateUserInfoReducer;
        const result = userInfoReducer.reducer(undefined, { type: "" });
        expect(result).toEqual(nextState);
    });

    it("resetState", () => {
        const testValue1: TInitStateUserInfoReducerType = {
            ...initStateUserInfoReducer,
            redirectTo: "43234",
            isAuth: true,
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
        const name = true;

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
        fetchMock.postOnce(mainUrl + "/auth/login", {
            body: expectedState,
        });
        const tmpForm: TLoginForm = { email: "wq", password: "sad"};
        await store.dispatch(logIn(tmpForm));
        // expect(store.getActions()).toEqual(expectedActions);
        expect(store.getActions().length).toEqual(2);
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
        fetchMock.patchOnce(mainUrl + "/auth/user", {
            body: expectedState,
        });

        // const expectedActions = [
        //     {
        //         type: "userInfoReducer/setUserInfo",
        //         payload: { email: "miozlhnpbpqioxjvcl@bptfp.net", name: "11" },
        //     },
        // ];

        const updateUserInforArg = {
            form: { email: "string", password: "string", name: "string" },
            accessToken: "string",
        };

        await store.dispatch(updateUserInfo(updateUserInforArg));
        expect(store.getActions().length).toEqual(2);

        // expect(store.getActions()).toEqual(expectedActions);
    });

    it("logout", async () => {
        const expectedState = {
            success: true,
        };

        const store = mockStore(initStateUserInfoReducer);
        fetchMock.postOnce(mainUrl + "/auth/logout", {
            body: expectedState,
        });

        // const expectedActions = [{ type: "userInfoReducer/resetState" }, { type: "userInfoReducer/setAuth", payload: false }];

        await store.dispatch(logout());

        // expect(store.getActions()).toEqual(expectedActions);
        expect(store.getActions().length).toEqual(2);
    });

    it("resetPassword", async () => {
        const expectedState = {
            success: true,
        };

        const store = mockStore(initStateUserInfoReducer);
        fetchMock.postOnce(mainUrl + "/password-reset/reset", {
            body: expectedState,
        });

        // const expectedActions = [{ type: "userInfoReducer/setRedirectTo", payload: "/login" }];
        const form: TResetPaswordForm = {
            password: "string",
            token: "string",
        };

        await store.dispatch(resetPassword(form));
        expect(store.getActions().length).toEqual(2);
    });

    it("forgotPassword", async () => {
        const expectedState = {
            success: true,
        };

        const store = mockStore(initStateUserInfoReducer);
        fetchMock.postOnce(mainUrl + "/password-reset", {
            body: expectedState,
        });

        // const expectedActions = [{ type: "userInfoReducer/setRedirectTo", payload: "/reset-password" }];

        await store.dispatch(forgotPassword({email:""}));

        expect(store.getActions().length).toEqual(2);
    });

    it("registnration", async () => {
        const expectedState = {
            success: true,
            accessToken: "test",
        };

        const store = mockStore(initStateUserInfoReducer);
        fetchMock.postOnce(mainUrl + "/auth/register", {
            body: expectedState,
        });

        // const expectedActions = [ { type: 'userInfoReducer/setAccessToken', payload: undefined }];
        const form: TRegistrationFormType = {
            email: "",
            password: "",
            name: "",
        };
        await store.dispatch(registnration(form));
        expect(store.getActions()[1].payload).toEqual({ success: true, accessToken: "test" });
    });
});
