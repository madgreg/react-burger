import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { registnration } from "services/reduсers/slices/user-Info";
import styles from "./login.module.css";
import { useDispatch, useSelector } from 'react-redux';


const RegisterPage = () => {
    const [form, setValue] = useState({ name: "", email: "", password: "" });
    const dispatch = useDispatch();
    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const {accessToken} = useSelector(store=>store.userInfo)
    const history = useHistory();

    useEffect(()=>{        
        if(accessToken){
            history.replace({ pathname: "/login" });
        }
    },[accessToken, history])

    let register = useCallback(
        (e) => {
            e.preventDefault();            
            dispatch(registnration(form));            
        },
        [form, dispatch]
    );

    return (
        <div style={{ width: 480, margin: "auto" }}>
            <form>
                <div className={["loginPanel", styles.loginPanel].join(" ")}>
                    <p className="text text_type_main-medium mb-6">Регистрация</p>
                    <div className="mb-6 input">
                        <Input placeholder={"Имя"} onChange={onChange} value={form.name} name={"name"} size={"default"} />
                    </div>
                    <div className="mb-6 input">
                        <Input type={"email"} placeholder={"E-mail"} onChange={onChange} value={form.email} name={"email"} size={"default"} />
                    </div>
                    <div className="mb-6 input">
                        <PasswordInput onChange={onChange} value={form.password} name={"password"} size={"default"} />
                    </div>
                    <div className="mb-20">
                        <Link to="/login">
                            <Button type="primary" size="medium" onClick={register}>
                                Зарегистрировать
                            </Button>
                        </Link>
                    </div>
                    <div className="text text_type_main-small mb-4">
                        <span style={{ color: "#8585AD" }}>Вспомнили пароль?</span>
                        <Link to="/login">
                            <span style={{ color: "#4C4CFF" }}>Войти</span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
