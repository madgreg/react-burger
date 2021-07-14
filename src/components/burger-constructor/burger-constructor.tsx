import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import React from "react";
import styles from "./burger-constructor.module.css";
import data from "../../utils/data.json";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

export default function BurgerConstructor() {
    let bloked = [<></>];
    let unbloked = [<></>];
    data.forEach((x) => {
        let opt = {
            key: x._id,
            text: x.name,
            price: x.price,
            thumbnail: x.image,
        };

        if (x.type === "bun") {
            let bOpt = {
                type: bloked.length === 1 ? "top" : "bottom",
                isLocked: true,
            };
            bloked.push(
                <div className={["pl-8", styles.element].join(' ')} >
                    <ConstructorElement {...{ ...bOpt, ...opt }} />
                </div>
            );
        } else {
            unbloked.push(
                <div className={["pt-4", styles.element].join(' ')} >
                    <DragIcon type="primary" />                    
                    <span className='pl-2'><ConstructorElement {...opt} /></span>
                    
                </div>
            );
        }
    });
    return (
        <section className={[styles.main, "pl-4"].join(" ")}>
            <div className="mt-25">{bloked[1]}</div>
            <section style={{ display: "contents" }}>
                <div style={{ overflowY: "auto", height: 480 }}>{unbloked} </div>
            </section>
            <div className="mt-4">{bloked[2]}</div>
            <div className={["mt-10", styles.price].join(" ")} >
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
