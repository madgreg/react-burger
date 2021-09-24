import { getCookie } from "utils/funcs";

export const deserializeQuery = (query, noQuestionMark = false) => {
    const pairs = (noQuestionMark ? query : query.substring(1)).split("&");
    const array = pairs.map((elem) => elem.split("="));
    return Object.fromEntries(array);
};

export const serializeQuery = (queryParams) =>
    Object.entries(queryParams).reduce((acc, [key, value], index, array) => {
        if (typeof value === "undefined") {
            return acc;
        }
        const postfix = index === array.length - 1 ? "" : "&";
        return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(value)}${postfix}`;
    }, "?");

//////
export const registerRequest = async (form) => {
    return await fetch("https://norma.nomoreparties.space/api/auth/register", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(form),
    });
};

export const refreshTokenRequest = async () =>
    await fetch("https://norma.nomoreparties.space/api/auth/token", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
            token: getCookie("refreshToken"),
        }),
    }).then((response) => {
        return response.json();
    });

export const getUserInfoRequest = async (token) =>
    await fetch("https://norma.nomoreparties.space/api/auth/user", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    }).then((response) => {
        return response.json();
    });

export const loginRequest = async (form) => {    
    return await fetch("https://norma.nomoreparties.space/api/auth/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(form),
    });
};

export const forgotPasswordRequest = async (form) =>
    await fetch("https://norma.nomoreparties.space/api/password-reset", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(form),
    });

export const resetPasswordRequest = async (form) =>
    await fetch("https://norma.nomoreparties.space/api/password-reset/reset", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(form),
    });

export const logoutRequest = async () => {
    return await fetch("https://norma.nomoreparties.space/api/auth/logout", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
            token: getCookie("refreshToken"),
        }),
    });
};

export const updateUserInfoRequest = async (form, token) => {
    return await fetch("https://norma.nomoreparties.space/api/auth/user", {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(form),
    });
};

export const loadBurgerIngredientRequest = async () => {    
    const response = await fetch("https://norma.nomoreparties.space/api/ingredients");
    if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
    }
    
    return response;
};

export const getOrderRequest = async (order) => {    
    const response = await fetch("https://norma.nomoreparties.space/api/orders/" + order, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
    }

    return response;
};
