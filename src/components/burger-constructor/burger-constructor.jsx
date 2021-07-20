import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import React from "react";
import styles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import OrderDetails from '../order-details/order-details';
import PropTypes from "prop-types";

const order = {
    bun: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c6"],
    ingredients: [
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733d2",
    ],
};

const getConstructorIngredient = (data, _id) => {
    const ingredient = data.filter((x) => x._id === _id);
    return ingredient.length > 0 ? ingredient[0] : undefined;
};

export default function BurgerConstructor({ data }) {
    const [sendOrder, setSendOrder] = React.useState(false);
    const sendOrderHandler=()=>{
        setSendOrder(true)
    }
    const unSendOrderHandler=()=>{
        setSendOrder(false)
    }
    const bloked = order.bun.map((x, index) => {
        const ingredient = getConstructorIngredient(data, x);
        if (!ingredient) {
            return "";
        }
        let opt = {
            key: ingredient._id,
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
            <div key={x._id + "_"} className={["pl-8", styles.element].join(" ")}>
                <ConstructorElement {...{ ...opt, text: opt.text + typeStr }} />
            </div>
        );
    });
    const unbloked = order.ingredients.map((x, index) => {
        const ingredient = getConstructorIngredient(data, x);
        if (!ingredient) {
            return "";
        }
        const opt = {
            key: ingredient._id,
            text: ingredient.name,
            price: ingredient.price,
            thumbnail: ingredient.image,
        };

        return (
            <div key={x._id} className={["pt-4", styles.element].join(" ")}>
                <DragIcon type="primary" />
                <span className="pl-2">
                    <ConstructorElement {...opt} />
                </span>
            </div>
        );
    });

    const orderId = '034536'
    return (
        <section className={[styles.main, "pl-4"].join(" ")}>
            <div className="mt-25">{bloked[0]}</div>
            <section style={{ display: "contents" }}>
                <div style={{ overflowY: "auto", height: 480 }}>{unbloked} </div>
            </section>
            <div className="mt-4">{bloked[1]}</div>
            <div className={["mt-10", styles.price].join(" ")}>
                <span className="mr-2 text text_type_digits-medium ">{1231}</span>
                <div className="mr-10">
                    <CurrencyIcon type="primary" />
                </div>
                {sendOrder&&<OrderDetails onClose={unSendOrderHandler} orderId={orderId}/>}
                <Button type="primary" size="large" onClick={sendOrderHandler}>
                    Оформить заказ
                </Button>
            </div>
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

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            ingredien: ingrediensPropTypes,
        })
    ).isRequired,
};