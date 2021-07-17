import React from "react";
import styles from "./tab-bar.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";

export default function TabBar() {
    const [current, setCurrent] = React.useState("one");
    return (
        <div className={styles.main}>
            <Tab value="one" active={current === "one"} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === "two"} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === "three"} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    );
}
