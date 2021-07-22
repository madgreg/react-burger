import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";

const URL = "https://norma.nomoreparties.space/api/ingredients";

export default function App() {
    const [data, setData] = React.useState([]);

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
                setData(data.data);
            })
            .catch((error) => {
                console.log(error)                
            });
    }, []);

    return (
        <section className={styles.app}>
            <AppHeader />
            <main className={styles.main_content}>
                <BurgerIngredients data={data} />
                <BurgerConstructor data={data} />
            </main>
        </section>
    );
}
