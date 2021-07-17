import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import React from "react";
import styles from "./burger-constructor.module.css";
import data from "../../utils/data.json";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

export default function BurgerConstructor() {
    let bloked = [];
    let unbloked = [];
    data.forEach((x) => {
        const opt = {
            key: x._id,
            text: x.name,
            price: x.price,
            thumbnail: x.image,
        };

        if (x.type === "bun" && bloked.length === 0) {
            let bOpt = {
                type: "top",
                isLocked: true,
            };
            bloked.push(
                <div key={x._id} className={["pl-8", styles.element].join(" ")}>
                    <ConstructorElement {...{ ...bOpt, ...opt, text: opt.text + " (верх)" }} />
                </div>
            );

            bOpt.type = "bottom";

            bloked.push(
                <div key={x._id + "_"} className={["pl-8", styles.element].join(" ")}>
                    <ConstructorElement {...{ ...bOpt, ...opt, text: opt.text + " (низ)" }} />
                </div>
            );
        } else {
            unbloked.push(
                <div key={x._id} className={["pt-4", styles.element].join(" ")}>
                    <DragIcon type="primary" />
                    <span className="pl-2">
                        <ConstructorElement {...opt} />
                    </span>
                </div>
            );
        }
    });
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
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}
