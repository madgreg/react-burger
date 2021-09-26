import { getCookie } from "utils/funcs";

export const registerRequest = async (form) => {
    const response =  await fetch("https://norma.nomoreparties.space/api/auth/register", {
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
    if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
    }

    return response;
};

export const refreshTokenRequest = async () => {
    const response = await fetch("https://norma.nomoreparties.space/api/auth/token", {
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
    if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
    }

    return response;
};
export const getUserInfoRequest = async (token) => {
    const response = await fetch("https://norma.nomoreparties.space/api/auth/user", {
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
    });
    if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
    }

    return response;
};

export const loginRequest = async (form) => {
    const response = await fetch("https://norma.nomoreparties.space/api/auth/login", {
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
    if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
    }

    return response;
};

export const forgotPasswordRequest = async (form) => {
    const response = await fetch("https://norma.nomoreparties.space/api/password-reset", {
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
    if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
    }

    return response;
};
export const resetPasswordRequest = async (form) => {
    const response = await fetch("https://norma.nomoreparties.space/api/password-reset/reset", {
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
    if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
    }

    return response;
};

export const logoutRequest = async () => {
    const response = await fetch("https://norma.nomoreparties.space/api/auth/logout", {
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
    if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
    }

    return response;
};

export const updateUserInfoRequest = async (form, token) => {
    const response = await fetch("https://norma.nomoreparties.space/api/auth/user", {
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
    if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
    }

    return response;
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

export const sendOrderRequest = async (order, accessToken) => {
    const response = await fetch("https://norma.nomoreparties.space/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({ ingredients: order.bun.concat(order.ingredients).map((x) => x._id) }),
    });
    if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
    }

    return response;
};
