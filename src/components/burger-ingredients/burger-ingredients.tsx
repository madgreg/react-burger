import React, { FC } from "react";
import BIList from "../bi-list/bi-list";
import TabBar from "../tab-bar/tab-bar";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients: FC = () => {
    return (
        <section className={[styles.main].join(" ")}>
            <div className="text text_type_main-large mt-10">Собери бургер</div>
            <section className="pt-5">
                <TabBar />
            </section>
            <BIList/>
        </section>
    );
}

export default BurgerIngredients;