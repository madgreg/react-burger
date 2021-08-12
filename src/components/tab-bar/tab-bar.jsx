import React, { useEffect } from "react";
import styles from "./tab-bar.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import { bunMenu, mainMenu, sauceMenu } from "utils/vars";
import { useSelector, useDispatch } from "react-redux";
import { burgerIngredientReducer } from "services/redusers";

export default function TabBar() {
    const dispatch = useDispatch();
    const { currentTab } = useSelector((store) => store.burgerIngredient);
    const { actions } = burgerIngredientReducer;
    const [current, setCurrent] = React.useState(currentTab);

    useEffect(() => {
        setCurrent(currentTab);
    }, [currentTab]);
    const onClickHandler = (value) => {
        dispatch(actions.setTab(value));        
        document.querySelector(`.fake_${value}`).scrollIntoView({ block: "start", behavior: "smooth" });
        setTimeout(()=>document.querySelector(`.${value}`).scrollIntoView({ block: "start" }), 1000)        
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
