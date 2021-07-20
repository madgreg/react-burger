import React from "react";
import BIList from "../bi-list/bi-list";
import TabBar from "../tab-bar/tab-bar";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";

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

const ingrediensPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
});

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            ingredien: ingrediensPropTypes,
        })
    ).isRequired,
};