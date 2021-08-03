import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { IngredientsContext } from "../../utils/contexts";
import { getRandomInt } from "../../utils/funcs";

const URL = "https://norma.nomoreparties.space/api/ingredients";

const initState = {
    burgerIngredients: [],
    orderId: null,
    order: {
        bun: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c6"],
        ingredients: [],
    },
};

const genState = (s) => {
    let tmpArr = [2, 5];
    const startArr = [
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733d2",
    ];
    let resultArray = [];

    startArr.forEach((x) => {
        if (tmpArr.indexOf(getRandomInt(6)) > -1) {
            resultArray.push(x);
            resultArray.push(x);
        } else {
            resultArray.push(x);
        }
    });

    return {
        ...initState,
        order: {
            bun: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c6"],
            ingredients: resultArray,
        },
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case "getIngredients":
            return {
                ...state,
                burgerIngredients: action.value,
            };
        case "setOrderId":
            return {
                ...state,
                orderId: action.value+'',
            };
        default:
            return state;
    }
};

export default function App() {
    const [appData, appDataDispatch] = React.useReducer(reducer, initState, genState);
    React.useEffect(() => {
        fetch(URL)
            .then((response) => {
                if (response.status >= 400 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                return response;
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                appDataDispatch({ type: "getIngredients", value: data.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <section className={styles.app}>
            <AppHeader />
            <main className={styles.main_content}>
                <IngredientsContext.Provider value={{appData, appDataDispatch}}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </IngredientsContext.Provider>
            </main>
        </section>
    );
}
