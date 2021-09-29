import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import React, { FC, useCallback, useRef } from "react";
import styles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

import { useDrag, useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";

import { burgerIngredientConstructorReducer, selectBIConstructorIsLoad, sendOrder } from "services/reduсers/slices/constructor-Ingredients";
import { RootStore } from 'services/store';
import { useAppDispatch, useAppSelector } from "services/hooks";

// interface DragableObject {
//     index: number | string;
//     getBoundingClientRect: () => any;
// }

const ConstructorElementWraper = ({ ingredient, index, opt, handleClose, moveIngredient }) => {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: "constructor",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }
            const current: any = ref.current;
            const hoverBoundingRect = current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset() ||  {x:0,y:0};
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [, drag] = useDrag({
        type: "constructor",
        item: () => {
            return { ingredient, index };
        },
    });

    drag(drop(ref));

    return (
        <div ref={ref} className={["pt-4", styles.element].join(" ")} data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <span className="pl-2">
                <ConstructorElement {...opt} handleClose={handleClose} />
            </span>
        </div>
    );
};

const BurgerConstructor:FC = () => {
    const { orderId, orderSum } = useAppSelector((store:RootStore) => store.burgerIngredientConstructor);
    const order = useAppSelector((store:RootStore) => store.burgerIngredientConstructor.order);
    const { actions } = burgerIngredientConstructorReducer;
    const BIConstructorIsLoad = useAppSelector(selectBIConstructorIsLoad);
    const { isAuth, accessToken } = useAppSelector((store:RootStore) => store.userInfo);

    const dispatch = useAppDispatch();
    const history = useHistory();

    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop(ingredien) {
            onDropHandler(ingredien);
        },
    });

    const onDropHandler = (ingredien) => {
        dispatch(actions.addIngredient(ingredien));
    };

    const sendOrderHandler = () => {
        if (order.bun.length > 0) {
            if (!isAuth) {
                history.replace({
                    pathname: "/login",
                    state: { referrer: history.location.pathname },
                });
            } else {
                // actions.resetOrder
                // dispatch(appReducer.actions.setLoad(false));
                dispatch(sendOrder({ order, accessToken }));
            }
        }
    };
    const unSendOrderHandler = () => {
        dispatch(actions.resetOrder());
    };

    React.useEffect(() => {
        if (order.bun.concat(order.ingredients).length > 0) {
            dispatch(actions.setSummOrder());
        }
    }, [order, dispatch, actions]);

    const bloked = order.bun.map((ingredient, index) => {
        if (!ingredient) {
            return "";
        }
        type TPosition =  "bottom" | "top"
        const pos:TPosition = "top"
        let opt = {
            text: ingredient.name,
            price: ingredient.price,
            thumbnail: ingredient.image,
            type: pos, //index > 0 ? "bottom": "top",
            isLocked: true,
        };
        let typeStr = " (верх)";
        if (index > 0) {
            typeStr = " (низ)";
        }

        const params = { ...opt, text: opt.text + typeStr }
        return (
            <div key={ingredient._id + "_" + index} className={["pl-8", styles.element].join(" ")}>
                <ConstructorElement {...params} />
            </div>
        );
    });

    const moveIngredient = useCallback(
        (dragIndex, hoverIndex) => {
            dispatch(actions.chagneIngredientPosition({ dragIndex, hoverIndex }));
        },
        [actions, dispatch]
    );

    const unbloked = order.ingredients.map((ingredient, index) => {
        if (!ingredient) {
            return "";
        }
        const opt = {
            text: ingredient.name,
            price: ingredient.price,
            thumbnail: ingredient.image,
        };
        const handleClose = () => dispatch(actions.delIngredient(index));
        const key = index;
        return <ConstructorElementWraper {...{ ingredient, key, index, opt, handleClose, moveIngredient }} />;
    });

    return (
        <>
            {!BIConstructorIsLoad && (
                <section className={[styles.main, "pl-4"].join(" ")}>
                    <div className="mt-25">{bloked[0]}</div>
                    <section style={{ display: "contents" }} ref={dropTarget}>
                        <div style={{ overflowY: "auto", height: 480 }} test-class="dnd-end">
                            {unbloked}
                        </div>
                    </section>
                    <div className="mt-4">{bloked[1]}</div>
                    <div className={["mt-10", styles.price].join(" ")}>
                        <span className="mr-2 text text_type_digits-medium ">{orderSum}</span>
                        <div className="mr-10">
                            <CurrencyIcon type="primary" />
                        </div>
                        {orderId && (
                            <Modal onClose={unSendOrderHandler} title="">
                                <OrderDetails orderId={orderId + ""} />
                            </Modal>
                        )}
                        <Button type="primary" size="large" onClick={sendOrderHandler}>
                            Оформить заказ
                        </Button>
                    </div>
                </section>
            )}

            {BIConstructorIsLoad && (
                <div className="loader">
                    <div className="inner one"></div>
                    <div className="inner two"></div>
                    <div className="inner three"></div>
                </div>
            )}
        </>
    );
}

export default BurgerConstructor
