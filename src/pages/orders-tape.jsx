import { OrdersList } from "components/orders-list/orders-list";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "services/reduсers/actions";
import { wsUrlAll } from "utils/vars";
import styles from "./orders-tape.module.css";

// 'pending' 'done'.  «Готовится» и «Выполнен»

const subArrays = (array, size) => {
    let subarray = [];
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
    }
    return subarray;
};

const OrdersTape = () => {
    const dispatch = useDispatch();
    const { orders, total, totalToday } = useSelector((store) => store.ordersTape.orderList);
    const [doneOrder, setDoneOrder] = useState([]);
    const [pendingOrder, setPendingOrder] = useState([]);

    useEffect(() => {
        let doneOrder_ = [];
        let pendingOrder_ = [];
        if (orders) {
            orders.forEach((order) => {
                if (order.status === "done") {
                    doneOrder_.push(order.number);
                } else {
                    if (order.status === "pending") {
                        pendingOrder_.push(order.number);
                    }
                }
            });

            doneOrder_ = subArrays(doneOrder_, 10);
            setDoneOrder(doneOrder_);

            pendingOrder_ = subArrays(pendingOrder_, 10);
            setPendingOrder(pendingOrder_);
        }
    }, [orders]);

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: wsUrlAll });
        return () => dispatch({ type: WS_CONNECTION_CLOSE });
    }, [dispatch]);

    return (
        <div style={{ margin: "auto" }}>
            <div className="pt-10 pb-5">
                <p className="text text_type_main-large">Лента заказов</p>
            </div>

            <div style={{ display: "flex" }}>
                <div style={{ height: 916, overflowY: "auto" }}>
                    <div className="pr-2" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <OrdersList />
                    </div>
                </div>
                <div className="ml-15" style={{ width: 580 }}>
                    <div style={{ display: "flex" }} className="pb-15">
                        <div className="pr-9" style={{ width: 280 }}>
                            <div className="text text_type_main-medium pb-6">Готовы: </div>
                            {doneOrder.map((block, idx) => {
                                return (
                                    <div key={`doneOrder${idx}`} className={styles.status_column}>
                                        {block.map((itm, idx) => {
                                            return (
                                                <div key = {idx} className="text text_type_digits-default pb-2" style={{ color: "#00CCCC" }}>
                                                    {itm}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ width: 280 }}>
                            <div className="text text_type_main-medium pb-6">В работе: </div>
                            {pendingOrder.map((block, idx) => {
                                return (
                                    <div key={`pendingOrder${idx}`} className={styles.status_column}>
                                        {block.map((itm, idx) => {
                                            return <div  key = {idx} className="text text_type_digits-default pb-2">{itm}</div>;
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="text text_type_main-medium">Выполнено за все время: </div>
                    <div className="text text_type_digits-large pb-15">{total}</div>
                    <div className="text text_type_main-medium">Выполнено за сегодня: </div>
                    <div className="text text_type_digits-large">{totalToday}</div>
                </div>
            </div>
        </div>
    );
};

export default OrdersTape;
