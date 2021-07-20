import React from "react";
import PropTypes from "prop-types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./bi-list.module.css";

const getCaptionElement=(title)=>{
    return <div className="text text_type_main-medium">{title}</div>;
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

const IngredienCard = ({ ingredien, count = 0, cssCls = "" }) => {
    const [viewDescription, setViewDescription] = React.useState(false);

    const handleModalClose = () => {
        setViewDescription(false);
    };
    const handleModalOpen = () => {
        setViewDescription(true);
    };
    return (
        <div className={styles.card + " " + cssCls}>
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
            {viewDescription ? <IngredientDetails onClose={handleModalClose} ingredien={ingredien} /> : ""}
        </div>
    );
};

IngredienCard.propTypes = {
    ingredien: ingrediensPropTypes.isRequired,
    count: PropTypes.number,
    cssCls: PropTypes.string,
};

const genMenu=(data)=>{
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
        const modFg = !(cnt % 2);
        predResult[x.type].productList.push(<IngredienCard key={x._id} ingredien={x} count={0} cssCls={!modFg ? " ml-6" : ""} />);
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
