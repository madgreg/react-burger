import React from "react";
import BIList from "../bi-list/bi-list";
import TabBar from "../tab-bar/tab-bar";
import styles from "./burger-ingredients.module.css";
import data from "../../utils/data.json";

export default function BurgerIngredients() {
    return (
        <section className={[styles.main].join(" ")}>
            <div className="text text_type_main-large mt-10">Собери бургер</div>
            <section className="pt-5">
                <TabBar />
            </section>
            <BIList data={data}/>
        </section>
    );
}
