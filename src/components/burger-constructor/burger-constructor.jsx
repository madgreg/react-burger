import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import React, { useCallback, useRef } from "react";
import styles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { burgerIngredientConstructorReducer, sendOrder } from "services/redusers";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { ingrediensPropTypes } from "types";

const ConstructorElementWraper = ({ ingredient, index, opt, handleClose, moveIngredient }) => {    
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: "constructor",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {            
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
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
        }
    });    

    drag(drop(ref));

    return (
        <div ref={ref}  className={["pt-4", styles.element].join(" ")} data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <span className="pl-2">
                <ConstructorElement {...opt} handleClose={handleClose} />
            </span>
        </div>
    );
};

ConstructorElementWraper.propTypes = {
    ingredient: ingrediensPropTypes.isRequired,
    index: PropTypes.number.isRequired,
    opt: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    moveIngredient: PropTypes.func.isRequired,
};

export default function BurgerConstructor() {
    const { orderId, orderSum } = useSelector((store) => store.burgerIngredientConstructor);
    const order = useSelector((store) => store.burgerIngredientConstructor.order);
    const { actions } = burgerIngredientConstructorReducer;
    const dispatch = useDispatch();

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
        if (orderSum > 0) {
            dispatch(sendOrder(order));
        }
    };
    const unSendOrderHandler = () => {
        console.log(1);
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

    const moveIngredient = useCallback(
        (dragIndex, hoverIndex) => {
            dispatch(actions.chagneIngredientPosition({dragIndex,hoverIndex}))
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
        <section className={[styles.main, "pl-4"].join(" ")}>
            <div className="mt-25">{bloked[0]}</div>
            <section style={{ display: "contents" }} ref={dropTarget}>
                <div style={{ overflowY: "auto", height: 480 }}>{unbloked}</div>
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
    );
}
