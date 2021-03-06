import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { forgotPassword, userInfoReducer } from "services/reduсers/slices/user-Info";
import { useHistory } from "react-router-dom";
import { RootStore } from "services/store";
import { useAppDispatch, useAppSelector } from "services/hooks";

const ForgotPasswordPage = () => {
    const [form, setValue] = useState({ email: "" });
    const { redirectTo } = useAppSelector((store:RootStore) => store.userInfo);
    const { setRedirectTo } = userInfoReducer.actions;

    const dispatch = useAppDispatch();
    const history = useHistory();

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    let onClickHandler = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(forgotPassword(form));
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
                                <Input type={"email"} placeholder={"Укажите e-mail"} onChange={onChange} value={form.email} name={"email"} size={"default"} />
                            </div>

                            <div className="mb-20">
                                <Button type="primary" size="medium" >
                                    Востановить
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

export default ForgotPasswordPage;
