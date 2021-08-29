import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "pages/login";
import RegisterPage from "pages/register";
import ForgotPasswordPage from "pages/forgot-password";
import ResetPasswordPage from "pages/reset-password";
import { loadBurgerIngredient } from "services/reduсers/slices/burger-ingredient";

import HomePage from "pages/home";
import { ProtectedRoute } from "components/protected-route/protected-route";
import { appStart } from "services/reduсers/slices/user-Info";

export default function App() {
    const dispatch = useDispatch();
    const { isLoad } = useSelector((store) => store.appInfo);

    useEffect(() => {
        dispatch(loadBurgerIngredient());
        dispatch(appStart());
    }, [dispatch]);
    

    return (
        <section className={styles.app}>
            <Router>
                <AppHeader />
                {isLoad && (
                    <main className={styles.main_content}>
                        <Switch>
                            <Route path="/" exact={true}>
                                <HomePage />
                            </Route>
                            <Route path="/login" exact={true}>
                                <LoginPage />
                            </Route>
                            <Route path="/register" exact={true}>
                                <RegisterPage />
                            </Route>
                            <Route path="/forgot-password" exact={true}>
                                <ForgotPasswordPage />
                            </Route>
                            <Route path="/reset-password" exact={true}>
                                <ResetPasswordPage />
                            </Route>
                            <ProtectedRoute path="/profile" exact={true}>
                                profil
                            </ProtectedRoute>
                            <Route path="/ingredients/:id" exact={true}>
                                ingredients
                            </Route>
                            <Route path="/404" exact={true}>
                                404
                            </Route>
                        </Switch>
                    </main>
                )}
                {!isLoad && (
                    <div className="loader">
                        <div className="inner one"></div>
                        <div className="inner two"></div>
                        <div className="inner three"></div>
                    </div>
                )}
            </Router>
        </section>
    );
}
