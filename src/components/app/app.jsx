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
import ProfilePage from "pages/profile";
import { ProtectedRouteAuth } from "components/protected-route/protected-route-auth";
import IngredientDetails from "components/ingredient-details/ingredient-details";
import OrderTape from "pages/order-tape";

export default function App() {
    const dispatch = useDispatch();
    const { isLoad } = useSelector((store) => store.appInfo);
    const { isModal } = useSelector((store) => store.burgerIngredient);    

    useEffect(() => {
        dispatch(loadBurgerIngredient());
        dispatch(appStart());                
    }, [dispatch]);

    useEffect(()=>{},[isLoad])

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
                            <ProtectedRouteAuth path="/login" exact={true}>
                                <LoginPage />
                            </ProtectedRouteAuth>
                            <Route path="/register" exact={true}>
                                <RegisterPage />
                            </Route>
                            <ProtectedRouteAuth path="/forgot-password" exact={true}>
                                <ForgotPasswordPage />
                            </ProtectedRouteAuth>
                            <ProtectedRouteAuth path="/reset-password" exact={true}>
                                <ResetPasswordPage />
                            </ProtectedRouteAuth>
                            <ProtectedRoute path="/profile" exact={true}>
                                <ProfilePage />
                            </ProtectedRoute>
                            <ProtectedRoute path="/profile/orders" exact={true}>
                                <ProfilePage />
                            </ProtectedRoute>
                            <ProtectedRoute path="/profile/orders/:id" exact={true}>
                                <ProfilePage />
                            </ProtectedRoute>

                            <ProtectedRoute path="/feed" exact={true}>
                                <OrderTape />
                            </ProtectedRoute>
                            <ProtectedRoute path="/feed/:id" exact={true}>
                                <OrderTape />
                            </ProtectedRoute>

                            <Route
                                path="/ingredients/:id"
                                exact={true}
                                render={(state) => {                                    
                                    return (
                                        <>
                                            {state.location.state && state.location.state.referrer && isModal && (
                                                <>
                                                    <HomePage />
                                                    <IngredientDetails />
                                                </>
                                            )}
                                            {!isModal && (
                                                <>
                                                    <IngredientDetails />
                                                </>
                                            )}
                                        </>
                                    );
                                }}
                            />

                            <Route>
                                <div className="text text_type_main-large mt-30" style={{ textAlign: "center", width: "100%" }}>
                                    Вы нас с кемто перепутали, у нас нет ТАКОГО
                                </div>
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
