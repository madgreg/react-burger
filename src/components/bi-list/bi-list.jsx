import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import styles from "./bi-list.module.css";
import { ingrediensPropTypes } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { bunMenu, mainMenu, sauceMenu } from "utils/vars";
import { useHistory } from "react-router-dom";
import { useDrag } from "react-dnd";
import { burgerIngredientReducer } from "services/reduсers/slices/burger-ingredient";

const getCaptionElement = (title, cssCls = "") => {
    return (
        <>
            <div className={"text text_type_main-medium " + cssCls}>{title}</div>
            <div className={"fake_" + cssCls}></div>
        </>
    );
};

const IngredienCard = ({ ingredien, count = 0, cssCls = "" }) => {
    const history = useHistory();
    const { actions } = burgerIngredientReducer;
    const dispatcn = useDispatch()
    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredients",
        item: ingredien,
    });
    const handleModalOpen = () => {
        dispatcn(actions.setModal(true))
        history.replace({
            pathname: `/ingredients/${ingredien._id}`,
            state: { referrer: history.location.pathname },
        });
    };
    return (
        !isDrag && (
            <div ref={dragRef} className={styles.card + " " + cssCls}>
                {count > 0 ? <Counter count={count} size="default" /> : <></>}

                <div onClick={handleModalOpen}>
                    <img src={ingredien.image} alt={ingredien.name} />
                    <div className={["text text_type_digits-default pt-2 pb-2", styles.price].join(" ")}>
                        <span className="mr-2">{ingredien.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div style={{ height: 48, textAlign: "center" }} className="text text_type_main-default">
                    {ingredien.name}
                </div>
            </div>
        )
    );
};

IngredienCard.propTypes = {
    ingredien: ingrediensPropTypes.isRequired,
    count: PropTypes.number,
    cssCls: PropTypes.string,
};

const getIngredientCount = (id, data) => {
    return data.reduce((total, x) => (x._id === id ? total + 1 : total), 0);
};

const genMenu = (data, order) => {
    let predResult = {
        bun: {
            productList: [getCaptionElement("Булки", bunMenu)],
        },
        sauce: {
            productList: [getCaptionElement("Соусы", sauceMenu)],
        },
        main: {
            productList: [getCaptionElement("Начинки", mainMenu)],
        },
    };

    data.forEach(function (x) {
        const cnt = predResult[x.type].productList.length + 1;
        const modFg = !(cnt % 2);
        predResult[x.type].productList.push(
            <IngredienCard key={x._id} ingredien={x} count={getIngredientCount(x._id, order)} cssCls={!modFg ? " ml-6" : ""} />
        );
    });

    return Object.keys(predResult).map((x, index) => {
        return (
            <div key={index} className="pt-10 pl-4" onClick={() => {}}>
                {predResult[x].productList[0]}
                <div style={{ display: "flex", flexFlow: "wrap" }}>{predResult[x].productList.slice(1)}</div>
            </div>
        );
    });
};

export default function BIList() {
    const { burgerIngredients } = useSelector((store) => store.burgerIngredient);
    const { order } = useSelector((store) => store.burgerIngredientConstructor);
    const [menu, setMenu] = React.useState([]);
    const observerRef = useRef(null);
    const { actions } = burgerIngredientReducer;
    const dispatch = useDispatch();

    useEffect(() => {
        let options = {
            rootMargin: "0px",
            threshold: 1,
        };
        let callback = function (entries, observer) {
            dispatch(actions.setTab(entries[0].target.classList[2]));
        };
        let observer = new IntersectionObserver(callback, options);
        const target = document.querySelector(`.${bunMenu}`);
        const target1 = document.querySelector(`.${sauceMenu}`);
        const target2 = document.querySelector(`.${mainMenu}`);
        if (target) {
            console.log(target);
            observer.observe(target);
            observer.observe(target1);
            observer.observe(target2);
        }
    }, [burgerIngredients, dispatch, actions]);

    React.useEffect(() => {
        setMenu(genMenu(burgerIngredients, order.bun.concat(order.ingredients)));
    }, [burgerIngredients, order]);

    return (
        <section style={{ display: "contents" }}>
            <div ref={observerRef} style={{ overflowY: "auto" }}>
                {menu}
            </div>
        </section>
    );
}
