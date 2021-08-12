import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { useDispatch } from "react-redux";
import { loadBurgerIngredient } from "../../services/redusers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(loadBurgerIngredient());
    }, [dispatch]);

    return (
        <section className={styles.app}>
            <AppHeader />
            <main className={styles.main_content}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </main>
        </section>
    );
}
