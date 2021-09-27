import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logIn, userInfoReducer } from "services/reduсers/slices/user-Info";
import styles from "./login.module.css";

import { useHistory } from "react-router-dom";
import { RootStore } from 'services/store';
import { useAppDispatch, useAppSelector } from "services/hooks";

const LoginPage = () => {
    const [form, setValue] = useState({ email: "", password: "" });
    const isAuth = useAppSelector((store:RootStore) => store.userInfo.isAuth);
    const { redirectTo } = useAppSelector((store:RootStore) => store.userInfo);
    const { setRedirectTo } = userInfoReducer.actions;
    const dispatch = useAppDispatch();
    const history = useHistory();

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    let login = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(logIn(form));
        },
        [form, dispatch]
    );

    useEffect(() => {
        if (isAuth) {
            if (history.location.state) {
                history.replace({ pathname: history.location.state.referrer });
            } else {
                history.replace({ pathname: "/" });
            }
        }
    }, [isAuth, history]);

    if (redirectTo) {
        if (redirectTo === history.location.pathname) {
            dispatch(setRedirectTo(null));
        } else {
            history.replace({ pathname: redirectTo, state: { referrer: history.location.pathname } });
        }
    }

    return (
        <div style={{ width: 480, margin: "auto" }}>
            <form onSubmit={login}>
                <div className={["loginPanel", styles.loginPanel].join(" ")}>
                    <p className="text text_type_main-medium mb-6">Вход</p>
                    <div className="mb-6 input">
                        <Input type={"email"} placeholder={"E-mail"} onChange={onChange} value={form.email} name={"email"} size={"default"} />
                    </div>
                    <div className="mb-6 input">
                        <PasswordInput onChange={onChange} value={form.password} name={"password"} size={"default"} />
                    </div>
                    <div className="mb-20">
                        <Button type="primary" size="medium" onClick={login}>
                            Войти
                        </Button>
                    </div>
                    <div className="text text_type_main-small mb-4">
                        <span style={{ color: "#8585AD" }}>Вы - новый пользователь?</span>
                        <Link to="/register">
                            <span style={{ color: "#4C4CFF" }}> Зарегестрироваться</span>
                        </Link>
                    </div>
                    <div className="text text_type_main-small">
                        <span style={{ color: "#8585AD" }}>Забыли пароль?</span>
                        <Link to="/forgot-password">
                            <span style={{ color: "#4C4CFF" }}> Востановить пароль</span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
