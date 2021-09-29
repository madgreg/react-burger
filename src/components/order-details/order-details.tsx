import React, { FC } from "react";
import styles from "./order-details.module.css";
import doneImg from "../../images/done.png";
import { TOrderDetails } from "types";

const OrderDetails: FC<TOrderDetails> = ({ orderId }) => {
    return (
        <div className={styles.box}>
            <section className="mt-8 text text_type_digits-large">{orderId}</section>
            <section className="mt-8 text text_type_main-medium">индификатор заказа</section>
            <section className={styles.doneImg + " mt-15"}>
                <img src={doneImg} alt="" />
            </section>
            <section className="mt-15 text text_type_main-default">Ваш заказ начали готовить</section>
            <section className="mt-2 text text_type_main-default" style={{ color: "#8585AD" }}>
                Дождитесь готовности на орбитальной станции
            </section>
        </div>
    );
};

export default OrderDetails;
