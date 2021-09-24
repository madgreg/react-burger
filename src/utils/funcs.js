export const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

export function getCookie(name) {
    // eslint-disable-next-line no-useless-escape
    const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == "number" && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + "=" + value + ";path=/";
    for (const propName in props) {
        updatedCookie += "; " + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    // console.log(updatedCookie)
    document.cookie = updatedCookie;
}

export function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
}

export const getDaysAfter = (dt) => {
    const start = new Date(dt);
    let start_ = (start + "").split(" ");
    const end = Date.now();
    const aday__ = Math.trunc((end - start) / 1000 / 86400);
    let aday = "Сегодня";
    if (aday__ === 1) {
        aday = "Вчера";
    } else {
        if (aday__ > 1) {
            aday = `${aday__} дня назад`;
        }
    }

    const h = start.getHours();
    let m = start.getMinutes();
    m = m > 9 ? m : "0" + m;

    return `${aday}, ${h}:${m} i-${start_[5]} `;
};
