import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useEffect, useState } from "react";


import styles from "./login.module.css";

import { resetPassword, userInfoReducer } from "services/reduсers/slices/user-Info";

import { Link, useHistory } from "react-router-dom";
import { RootStore } from 'services/store';
import { useAppDispatch, useAppSelector } from "services/hooks";

const ResetPasswordPage = () => {
    const [form, setValue] = useState({ password: "", token: "" });
    const { redirectTo } = useAppSelector((store:RootStore) => store.userInfo);
    const { setRedirectTo } = userInfoReducer.actions;
    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!history.location.state || history.location.state.referrer !== "/forgot-password") {
            history.replace({ pathname: "/forgot-password" });
        }
    }, [history]);

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    let onClickHandler = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(resetPassword(form));
        },
        [form, dispatch]
    );

    if (redirectTo) {
        if (redirectTo === history.location.pathname) {
            dispatch(setRedirectTo(null));
        } else {
            history.replace({ pathname: redirectTo, state: { referrer: history.location.pathname } });
        }
    }
    
    return (
        <>
            {!redirectTo && (
                <div style={{ width: 480, margin: "auto" }}>
                    <form onSubmit={onClickHandler}>
                        <div className={["loginPanel", styles.loginPanel].join(" ")}>
                            <p className="text text_type_main-medium mb-6">Востановление пароля</p>
                            <div className="mb-6 input">
                                <PasswordInput
                                    onChange={onChange}
                                    value={form.password}
                                    name={"password"}
                                    size={"default"}
                                    // placeholder={"Введите новый пароль"}
                                />
                            </div>
                            <div className="mb-6 input">
                                <Input placeholder={"Введите код из письма"} onChange={onChange} value={form.token} name="token" size={"default"} />
                            </div>

                            <div className="mb-20">
                                <Button type="primary" size="medium" onClick={onClickHandler}>
                                    Сохранить
                                </Button>
                            </div>

                            <div className="text text_type_main-small mb-4">
                                <span style={{ color: "#8585AD" }}>Вспомнили пароль?</span>
                                <Link to="/login">
                                    <span style={{ color: "#4C4CFF" }}> Войти</span>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ResetPasswordPage;
