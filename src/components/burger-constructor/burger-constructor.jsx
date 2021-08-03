import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import React, { useContext } from "react";
import styles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import OrderDetails from "../order-details/order-details";
// import PropTypes from "prop-types";
// import { ingrediensPropTypes } from "../../types";
import Modal from "../modal/modal";
import { IngredientsContext } from "../../utils/contexts";

const URL = "https://norma.nomoreparties.space/api/orders";

const getConstructorIngredient = (data, _id) => {
    // console.log(data, _id)
    const ingredient = data.filter((x) => x._id === _id);
    return ingredient.length > 0 ? ingredient[0] : undefined;
};

const initSate = {
    summ: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "set":
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const orderIngredient = action.value.order.bun.concat(action.value.order.ingredients);

            return {
                summ: orderIngredient
                    .map((x) => {
                        return getConstructorIngredient(action.value.burgerIngredients, x).price;
                    })
                    .reduce(reducer),
            };
        case "reset":
            return initSate;
        default:
            return state;
    }
};

export default function BurgerConstructor() {
    const { appData, appDataDispatch } = useContext(IngredientsContext);
    const [orderData, orderSummDispatch] = React.useReducer(reducer, initSate);

    const [sendOrder, setSendOrder] = React.useState(false);
    const sendOrderHandler = () => {
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ ingredients: appData.order.bun.concat(appData.order.ingredients) }),
        })
            .then((response) => {
                if (response.status >= 400 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                return response;
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.order.number);
                appDataDispatch({ type: "setOrderId", value: data.order.number });
                setSendOrder(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const unSendOrderHandler = () => {
        setSendOrder(false);
    };

    React.useEffect(() => {
        if (appData.burgerIngredients.length > 0) {
            orderSummDispatch({ type: "set", value: appData });
        }
    }, [appData.order, appData.burgerIngredients]);

    const bloked = appData.order.bun.map((x, index) => {
        const ingredient = getConstructorIngredient(appData.burgerIngredients, x);
        if (!ingredient) {
            return "";
        }
        let opt = {
            text: ingredient.name,
            price: ingredient.price,
            thumbnail: ingredient.image,
            type: "top",
            isLocked: true,
        };
        let typeStr = " (верх)";
        if (index > 0) {
            opt.type = "bottom";
            typeStr = " (низ)";
        }

        return (
            <div key={ingredient._id + "_" + index} className={["pl-8", styles.element].join(" ")}>
                <ConstructorElement {...{ ...opt, text: opt.text + typeStr }} />
            </div>
        );
    });
    const unbloked = appData.order.ingredients.map((x, index) => {
        const ingredient = getConstructorIngredient(appData.burgerIngredients, x);
        if (!ingredient) {
            return "";
        }
        const opt = {
            text: ingredient.name,
            price: ingredient.price,
            thumbnail: ingredient.image,
        };
        return (
            <div key={ingredient._id + "_" + index} className={["pt-4", styles.element].join(" ")}>
                <DragIcon type="primary" />
                <span className="pl-2">
                    <ConstructorElement {...opt} />
                </span>
            </div>
        );
    });

    return (
        <section className={[styles.main, "pl-4"].join(" ")}>
            <div className="mt-25">{bloked[0]}</div>
            <section style={{ display: "contents" }}>
                <div style={{ overflowY: "auto", height: 480 }}>{unbloked} </div>
            </section>
            <div className="mt-4">{bloked[1]}</div>
            <div className={["mt-10", styles.price].join(" ")}>
                <span className="mr-2 text text_type_digits-medium ">{orderData.summ}</span>
                <div className="mr-10">
                    <CurrencyIcon type="primary" />
                </div>
                {sendOrder && (
                    <Modal onClose={unSendOrderHandler} title="">
                        <OrderDetails orderId={appData.orderId} />
                    </Modal>
                )}
                <Button type="primary" size="large" onClick={sendOrderHandler}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

// BurgerConstructor.propTypes = {
//     data: PropTypes.arrayOf(ingrediensPropTypes).isRequired,
// };
