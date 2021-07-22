import React from "react";
import BIList from "../bi-list/bi-list";
import TabBar from "../tab-bar/tab-bar";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { ingrediensPropTypes } from "../../types";


export default function BurgerIngredients({data}) {
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

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingrediensPropTypes).isRequired,    
};