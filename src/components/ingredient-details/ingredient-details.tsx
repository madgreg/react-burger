import React, { FC, useEffect } from "react";
import styles from "./ingredient-details.module.css";


import Modal from "components/modal/modal";
import { burgerIngredientReducer } from "services/reduсers/slices/burger-ingredient";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { RootStore } from "services/store";
import { TIngredientDetails } from "types";
import { useAppDispatch, useAppSelector } from "services/hooks";

const getStatisticItem = (title, value) => {
    const statisticCssClass = "mt-2 text text_type_digits-default " + styles.textAlignCenter;
    return (
        <span className="ml-5 text text_type_main-default">
            {title}
            <p className={statisticCssClass}>{value}</p>
        </span>
    );
};

const IngredientDetails:FC<TIngredientDetails|any> = ({isModal = false}) => {
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const ingredien = useAppSelector((store: RootStore) => store.burgerIngredient.currentViewIngredient);

    const { actions } = burgerIngredientReducer;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(actions.setCurrentViewIngredient(params.id));
    }, [params.id, actions, dispatch]);

    const handleModalClose = () => {
        dispatch(actions.setCurrentViewIngredient(null));
        history.replace({
            pathname: "/",
        });
    };

    return (
        <>
            {ingredien && location.state && isModal && (
                <Modal onClose={handleModalClose} title="Детали ингредиента">
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
            )}
            {ingredien && !isModal && (
                <div className={styles.box}>
                    <div className="text text_type_main-large mt-30">Детали ингредиента</div>
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
            )}
        </>
    );
};

export default IngredientDetails;
