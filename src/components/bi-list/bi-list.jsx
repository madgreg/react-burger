import React from "react";
import PropTypes from "prop-types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import styles from "./bi-list.module.css";

function getCaptionElement(title) {
    return <div className="text text_type_main-medium">{title}</div>;
}

getCaptionElement.propTypes = {
    orderId: PropTypes.string,
};

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

function getCard(x, modFg) {
    const rnd = Math.floor(Math.random() * 6);
    return (
        <div key={x._id} className={styles.card + (!modFg ? " ml-6" : "")}>
            {rnd === 5 || rnd === 2 ? <Counter count={rnd} size="default" /> : <></>}

            <div>
                <img src={x.image} alt={x.name} />
                <div className={["text text_type_digits-default pt-2 pb-2", styles.price].join(" ")}>
                    <span className="mr-2">{x.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
            <div style={{ height: 48, textAlign: "center" }} className="text text_type_main-default">
                {x.name}
            </div>
        </div>
    );
}

getCard.propTypes = {
    item: ingrediensPropTypes.isRequired,
    modFg: PropTypes.bool.isRequired,
};

function genMenu(data) {
    let predResult = {
        bun: {
            productList: [getCaptionElement("Булки")],
        },
        sauce: {
            productList: [getCaptionElement("Соусы")],
        },
        main: {
            productList: [getCaptionElement("Начинки")],
        },
    };

    data.forEach(function (x) {
        const cnt = predResult[x.type].productList.length + 1;
        predResult[x.type].productList.push(getCard(x, !(cnt % 2)));
    });

    return Object.keys(predResult).map((x, index) => {
        return (
            <div key={index} className="pt-10 pl-4">
                {predResult[x].productList[0]}
                <div style={{ display: "flex", flexFlow: "wrap" }}>{predResult[x].productList.slice(1)}</div>
            </div>
        );
    });
}

genMenu.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            ingredien: ingrediensPropTypes,
        })
    ).isRequired,
};

export default function BIList({ data }) {
    const [menu, setMenu] = React.useState([]);

    React.useEffect(() => {
        setMenu(genMenu(data));
    }, [data, setMenu]);

    return (
        <section style={{ display: "contents" }}>
            <div style={{ overflowY: "auto" }}>{menu}</div>
        </section>
    );
}

BIList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            ingredien: ingrediensPropTypes,
        })
    ).isRequired,
};