import React from "react";
import styles from "./ingredient-details.module.css";
import Modal from "../modal/modal";
import { PropTypes } from 'prop-types';

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

const getStatisticItem = (title, value) => {
    const statisticCssClass = "mt-2 text text_type_digits-default " + styles.textAlignCenter;
    return (
        <span className="ml-5 text text_type_main-default">
            {title}
            <p className={statisticCssClass}>{value}</p>
        </span>
    );
};

export default function IngredientDetails({ onClose, ingredien }) {
    return (
        <Modal onClose={onClose} title="Детали ингредиента">
            <div className={styles.box}>
                <img src={ingredien.image_large} alt={ingredien.name} />
                <div className="mt-4 text text_type_main-medium" style={{ textAlign: "center" }}>
                    <span>{ingredien.name}</span>
                </div>
                <div className="mt-8" style={{ color: "#8585AD", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {getStatisticItem("Каллории,калл", ingredien.calories)}
                    {getStatisticItem("Белки, г", ingredien.proteins)}
                    {getStatisticItem("Жиры, г", ingredien.fat)}
                    {getStatisticItem("Углеводы, г", ingredien.carbohydrates)}
                </div>
            </div>
        </Modal>
    );
}

IngredientDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
    ingredien: ingrediensPropTypes.isRequired
};

