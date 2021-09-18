import React, { useEffect } from "react";
import styles from "./ingredient-details.module.css";

import { useDispatch, useSelector } from "react-redux";
import Modal from "components/modal/modal";
import { burgerIngredientReducer } from "services/reduсers/slices/burger-ingredient";
import { useParams, useLocation, useHistory } from "react-router-dom";

const getStatisticItem = (title, value) => {
    const statisticCssClass = "mt-2 text text_type_digits-default " + styles.textAlignCenter;
    return (
        <span className="ml-5 text text_type_main-default">
            {title}
            <p className={statisticCssClass}>{value}</p>
        </span>
    );
};

export default function IngredientDetails({isModal=false}) {
    const params = useParams();
    const location = useLocation();
    const history = useHistory()
    const ingredien = useSelector((store) => store.burgerIngredient.currentViewIngredient);
    
    const { actions } = burgerIngredientReducer;
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(actions.setCurrentViewIngredient(params.id));
    }, [params.id,actions,dispatch]);

    const handleModalClose = () => {
        dispatch(actions.setCurrentViewIngredient(null));
        // dispatch(actions.setModal(false))

        history.replace({
            pathname: '/',
        });

        // if(location.state){
        //     history.replace({
        //         pathname:  location.state.referrer,
        //         state:  undefined
        //     });
        // }
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
}
