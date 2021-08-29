import React, { useEffect, useState } from "react";
import { appReducer } from "services/reduсers/slices/app";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, Link } from "react-router-dom";
import { logout, updateUserInfo } from "services/reduсers/slices/user-Info";


const ProfilePage = () => {
    const history = useHistory();
    const urlArr = history.location.pathname.split("/"); 
    const userInfo = useSelector(store=>store.userInfo)    
    const [form, setValue] = useState({ name: userInfo.name, email: userInfo.email, password: "" });   

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onClickHandler = ()=>{
        dispatch(logout())
    }

    const saveOnClickHandler = ()=>{
        dispatch(updateUserInfo(form, userInfo.accessToken))
    }

    const cancelOnClickHandler = ()=>{
        setValue({ name: userInfo.name, email: userInfo.email, password: "" })
    }

    const dispatch = useDispatch();
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
                    <li className={["text text_type_main-medium", styles.inactive].join(" ")} onClick={onClickHandler}>Выход</li>
                </ul>
                <div className="text text_type_main-small" style={{ color: "#8585AD" }}>
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </div>
            <div style={{ width: 480, display: "flex", flexDirection: "column", gap: 24 }} className="ProfilEditPanel">
                <Input type={"text"} placeholder={"Имя"} onChange={onChange} icon={"EditIcon"} value={form.name} name={"name"} size={"default"} />
                <Input type={"email"} placeholder={"Логин"} onChange={onChange} icon={"EditIcon"} value={form.email} name={"email"} size={"default"} />
                <Input type={"password"} placeholder={"Пароль"} onChange={onChange} icon={"EditIcon"} value={form.password} name={"password"} size={"default"} />
                <Button type="primary" size="large" onClick={saveOnClickHandler}>
                    Сохранить
                </Button>
                <Button type="primary" size="large" onClick={cancelOnClickHandler}>
                    Отмена
                </Button>
            </div>
        </section>
    );
};

export default ProfilePage;
