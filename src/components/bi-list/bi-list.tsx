import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import React from "react";
import styles from "./bi-list.module.css";

function getCaptionElement(key, title) {
    return (
        <div key={key} className="text text_type_main-medium">
            {title}
        </div>
    );
}

function getCard(x, modFg) {
    let rnd = Math.floor(Math.random() * 6);
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

function genMenu(data) {
    let predResult = {
        bun: {
            productList: [getCaptionElement("bun1", "Булки")],
        },
        sauce: {
            productList: [getCaptionElement("sauce1", "Соусы")],
        },
        main: {
            productList: [getCaptionElement("main1", "Начинки")],
        },
    };

    data.forEach(function (x) {
        let cnt = predResult[x.type].productList.length + 1;
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
