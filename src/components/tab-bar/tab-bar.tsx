import React, { FC, useEffect } from "react";
import styles from "./tab-bar.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import { bunMenu, mainMenu, sauceMenu } from "utils/vars";

import { burgerIngredientReducer, selectCurrentTab } from "services/reduсers/slices/burger-ingredient";
import { useAppDispatch, useAppSelector } from "services/hooks";

const TabBar:FC = () => {
    const dispatch = useAppDispatch();
    const currentTab = useAppSelector(selectCurrentTab);
    const { actions } = burgerIngredientReducer;
    const [current, setCurrent] = React.useState(currentTab);

    useEffect(() => {
        setCurrent(currentTab);
    }, [currentTab]);
    const onClickHandler = (value) => {
        dispatch(actions.setTab(value));
        const node1: HTMLDivElement | any = document.querySelector(`.fake_${value}`);
        node1.scrollIntoView({ block: "start", behavior: "smooth" });
        setTimeout(() => {
            const node2: HTMLDivElement | any = document.querySelector(`.${value}`);
            node2.scrollIntoView({ block: "start" });
        }, 1000);
    };

    return (
        <div className={styles.main}>
            <Tab value={bunMenu} active={current === bunMenu} onClick={onClickHandler}>
                Булки
            </Tab>
            <Tab value={sauceMenu} active={current === sauceMenu} onClick={onClickHandler}>
                Соусы
            </Tab>
            <Tab value={mainMenu} active={current === mainMenu} onClick={onClickHandler}>
                Начинки
            </Tab>
        </div>
    );
}

export default TabBar