import React, { useCallback, useEffect, useState } from "react";
import { appReducer } from "services/reduсers/slices/app";

import styles from "./profile.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, Link } from "react-router-dom";
import { logout, updateUserInfo } from "services/reduсers/slices/user-Info";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "services/reduсers/actions";
import { wsUrlProfile } from "utils/vars";
import { OrdersList } from "components/orders-list/orders-list";
import { RootStore } from "services/store";
import { TRegistrationFormType } from "types";
import { useAppDispatch, useAppSelector } from "services/hooks";

const ProfilePage = () => {
    const history = useHistory();
    const urlArr = history.location.pathname.split("/");
    const userInfo = useAppSelector((store: RootStore) => store.userInfo);
    const clearForm: TRegistrationFormType = {  email: userInfo.email, password: "", name: userInfo.name };
    const [form, setValue] = useState(clearForm);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: wsUrlProfile + userInfo.accessToken });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE });
        };
    }, [dispatch, userInfo.accessToken]);

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onClickHandler = () => {
        dispatch(logout());
    };

    let saveOnClickHandler = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(updateUserInfo({ form: form, accessToken: userInfo.accessToken }));
        },
        [form, userInfo.accessToken, dispatch]
    );

    const cancelOnClickHandler = () => {
        setValue({ name: userInfo.name, email: userInfo.email, password: "" });
    };

    useEffect(() => {
        dispatch(appReducer.actions.setActivePage("profile"));
    }, [dispatch]);
    return (
        <section style={{ paddingTop: 120, display: "flex" }}>
            <div style={{ width: 320 }} className="pr-15">
                <ul className="pb-20" style={{ listStyle: "none", paddingLeft: 0 }}>
                    <Link to="/profile">
                        <li className={["text text_type_main-medium", urlArr[2] === "orders" ? styles.inactive : ""].join(" ")}>Профиль</li>
                    </Link>
                    <Link to="/profile/orders">
                        <li className={["text text_type_main-medium", urlArr[2] !== "orders" ? styles.inactive : ""].join(" ")}>История заказов</li>
                    </Link>
                    <li className={["text text_type_main-medium", styles.inactive].join(" ")} onClick={onClickHandler}>
                        Выход
                    </li>
                </ul>
                <div className="text text_type_main-small" style={{ color: "#8585AD" }}>
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </div>

            {urlArr[2] !== "orders" && (
                <form onSubmit={saveOnClickHandler} className="ProfilEditPanel" style={{ width: 480, display: "flex", flexDirection: "column", gap: 24 }}>
                    <Input type={"text"} placeholder={"Имя"} onChange={onChange} icon={"EditIcon"} value={form.name} name={"name"} size={"default"} />
                    <Input type={"email"} placeholder={"Логин"} onChange={onChange} icon={"EditIcon"} value={form.email} name={"email"} size={"default"} />
                    <Input
                        type={"password"}
                        placeholder={"Пароль"}
                        onChange={onChange}
                        icon={"EditIcon"}
                        value={form.password}
                        name={"password"}
                        size={"default"}
                    />
                    <Button type="primary" size="large" onClick={saveOnClickHandler}>
                        Сохранить
                    </Button>
                    <Button type="primary" size="large" onClick={cancelOnClickHandler}>
                        Отмена
                    </Button>
                </form>
            )}
            {urlArr[2] === "orders" && (
                <div style={{ width: 844 }}>
                    <OrdersList pathname="profile/orders" />
                </div>
            )}
        </section>
    );
};

export default ProfilePage;
