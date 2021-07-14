import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";

export default function App() {
    return (
        <section className={styles.app}>
            <AppHeader />
            <main className={styles.main_content}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </section>
    );
};