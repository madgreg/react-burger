import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "components/modal/modal";
import React, { useEffect, useState } from "react";

import { appReducer } from "services/reduсers/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getOrder } from "services/reduсers/slices/orders-tape";
import { getDaysAfter } from "utils/funcs";
import { orderState } from "utils/vars";

const getBody = (curentOrder, listIngridient, orderSum) => {
    return (
        <>
            <div className="text text_type_main-medium pb-3">{curentOrder[0].name}</div>
            <div className="text text_type_main-small pb-15" style={{ color: orderState[curentOrder[0].status][1] }}>
                {orderState[curentOrder[0].status][0]}
            </div>
            <div className="text text_type_main-medium pb-6">Состав:</div>
            <ul style={{ listStyle: "none", padding: 0, paddingTop: 5, paddingRight: 6, height: 312, overflowY: "auto" }}>
                {Object.keys(listIngridient).map((ingredientId, idx) => {
                    const ingridient = listIngridient[ingredientId];
                    return (
                        ingridient && (
                            <li key={ingredientId} style={{ display: "flex", alignItems: "center" }} className="pb-4">
                                <div className="pr-4">
                                    <img
                                        src={ingridient.image}
                                        alt=""
                                        style={{
                                            width: 64,
                                            height: 64,
                                            background: "#131316",
                                            borderRadius: 100,
                                            border: "1px solid #7231ed",
                                        }}
                                    />
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <div className="text text_type_main-small pr-4">{ingridient.name} </div>
                                    <div style={{ display: "flex" }}>
                                        <div className="text text_type_digits-default pr-2">
                                            {ingridient.count} x {ingridient.price}
                                        </div>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            </li>
                        )
                    );
                })}
            </ul>
            <div style={{ display: "flex", justifyContent: "space-between" }} className="pt-10 pb-6">
                <div className="text text_type_main-default text_color_inactive">{getDaysAfter(curentOrder[0].createdAt)}</div>
                <div style={{ display: "flex" }}>
                    <div className="text text_type_digits-default pr-2">{orderSum}</div>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </>
    );
};

const OrderTape = ({ isModal = false }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const { curentOrder } = useSelector((store) => store.ordersTape);
    const [listIngridient, setListIngridient] = useState({});
    const [orderSum, setOrderSum] = useState(0);
    const burgerIngredients = useSelector((store) => store.burgerIngredient.burgerIngredients);
    const history = useHistory();

    useEffect(() => {
        if (!isModal) {
            dispatch(appReducer.actions.setActivePage("orders_tape"));
        }
    }, [dispatch, isModal]);

    useEffect(() => {
        dispatch(getOrder(params.id));
    }, [params, dispatch]);

    useEffect(() => {
        if (curentOrder) {
            let sumOrd = 0;
            let lst = {};
            curentOrder[0].ingredients.forEach((ingredientId) => {
                const ingridient = burgerIngredients.filter((x) => x._id === ingredientId)[0];
                if (ingridient) {
                    sumOrd = sumOrd + ingridient.price;
                    if (!lst[ingredientId]) {
                        lst[ingredientId] = { ...ingridient, count: 1 };
                    } else {
                        lst[ingredientId].count = lst[ingredientId].count + 1;
                    }
                }
            });
            setOrderSum(sumOrd);
            setListIngridient(lst);
        }
    }, [burgerIngredients, curentOrder]);

    const closeModal = () => {
        history.replace({
            pathname: history.location.pathname.replace(params.id, ""),
        });
    };

    return (
        <>
            {isModal && curentOrder && (
                <Modal onClose={closeModal} title={"#" + curentOrder[0].number} titleSize="text_type_digits-default">
                    <div style={{ margin: "auto" }}>
                        <div style={{ width: 620, height: 640 }} className="mt-10">
                            {getBody(curentOrder, listIngridient, orderSum)}
                        </div>
                    </div>
                </Modal>
            )}
            {!isModal && curentOrder && (
                <>
                    <div style={{ margin: "auto" }}>
                        <div style={{ width: 620, height: 640 }} className="mt-30">
                            <div className="text text_type_digits-default pb-10" style={{ textAlign: "center" }}>
                                #{curentOrder[0].number}
                            </div>
                            {getBody(curentOrder, listIngridient, orderSum)}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OrderTape;
