import React from "react";
import styles from "./ingredient-details.module.css";

import { ingrediensPropTypes } from "../../types";

const getStatisticItem = (title, value) => {
    const statisticCssClass = "mt-2 text text_type_digits-default " + styles.textAlignCenter;
    return (
        <span className="ml-5 text text_type_main-default">
            {title}
            <p className={statisticCssClass}>{value}</p>
        </span>
    );
};

export default function IngredientDetails({ ingredien }) {
    return (
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
    );
}

IngredientDetails.propTypes = {    
    ingredien: ingrediensPropTypes.isRequired,
};
