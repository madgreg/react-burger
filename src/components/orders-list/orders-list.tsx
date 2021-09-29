import { Link } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";

import { getDaysAfter } from "utils/funcs";
import { orderState } from "utils/vars";
import { selectBurgerIngredients } from "services/reduсers/slices/burger-ingredient";
import { RootStore } from "services/store";
import { TOrdersList } from "types";
import { useAppSelector } from "services/hooks";

export const OrdersList: FC<TOrdersList | any> = ({ pathname = "feed" }) => {
    const orders = useAppSelector((store: RootStore) => store.ordersTape.orderList);
    const burgerIngredients = useAppSelector(selectBurgerIngredients);
    
    return (
        <div style={{ height: 916, overflowY: "auto" }}>
            <div className="pr-2" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {orders &&
                    burgerIngredients &&
                    orders.map((order) => {
                        let orderSum = 0;
                        order.ingredients.forEach((ingredient) => {
                            const ingridient = burgerIngredients.filter((x) => x._id === ingredient)[0];
                            if (ingridient) {
                                orderSum += ingridient.price;
                            }
                        });

                        return (
                            <Link key={order.number} to={{ pathname: `/${pathname}/${order.number}`, state: { modal: true } }}>
                                <div style={{ backgroundColor: "#1C1C21", borderRadius: 40, zIndex: -20, position: "relative" }} className="p-6">
                                    <div style={{ display: "flex", justifyContent: "space-between" }} className="pb-6">
                                        <div className="text text_type_digits-default">#{order.number}</div>
                                        <div className="text text_type_main-small text_color_inactive">{getDaysAfter(order.createdAt)}</div>
                                    </div>
                                    <div className="text text_type_main-medium " style={{ overflowY: "hidden" }}>
                                        {order.name}
                                    </div>
                                    <div className="text text_type_main-small pb-6 pt-2" style={{ color: orderState[order.status][1] }}>
                                        {pathname !== "feed" && orderState[order.status][0]}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            {order.ingredients.slice(0, 5).map((ingredientId, idx) => {
                                                const ingridient = burgerIngredients.filter((x) => x._id === ingredientId)[0];
                                                return (
                                                    ingridient && (
                                                        <img
                                                            // src={ingridient.image_mobile}
                                                            alt=""
                                                            key={idx}
                                                            style={{
                                                                width: 68,
                                                                height: 68,
                                                                background: "#131316",
                                                                borderRadius: 100,
                                                                border: "1px solid #7231ed",
                                                                position: "relative",
                                                                zIndex: -1 - idx,
                                                                marginLeft: idx > 0 ? -15 : 0,
                                                                backgroundImage: `url(${ingridient.image_mobile})`,
                                                                backgroundPosition: "center",
                                                            }}
                                                        />
                                                    )
                                                );
                                            })}
                                            {order.ingredients.length > 5 ? (
                                                <div
                                                    key={"df6"}
                                                    style={{
                                                        width: 68,
                                                        height: 68,
                                                        background: "#131316",
                                                        borderRadius: 100,
                                                        border: "1px solid #7231ed",
                                                        position: "relative",
                                                        zIndex: 15 - 6,
                                                        marginLeft: 6 > 0 ? -15 : 0,
                                                        float: "right",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        // backgroundRepeat: "round",

                                                        backgroundImage: "url(https://code.s3.yandex.net/react/code/cheese-mobile.png)",
                                                        backgroundPosition: "center",
                                                        opacity: "0.8",
                                                    }}
                                                >
                                                    <span
                                                        className="text text_type_digits-default"
                                                        style={{ position: "relative", zIndex: 15 - 5, opacity: 1 }}
                                                    >
                                                        +{order.ingredients.length - 5}
                                                    </span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <div className="text text_type_digits-default pr-2">{orderSum}</div>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
};
