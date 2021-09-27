import { Logo } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";

import HeaderButton from "../header-button/header-button";
import { Link } from "react-router-dom";
import styles from "./app-header.module.css";

import { RootStore } from "services/store";
import { FC } from "react";
import { useAppSelector } from "services/hooks";

const AppHeader:FC = () => {
    const { activePage } = useAppSelector((store:RootStore) => store.appInfo);
    return (
        <div className={styles.app_head}>
            <nav className={styles.head_nav}>
                <section className={styles.nav_block}>
                    <Link to="/">
                        <HeaderButton
                            iconName="BurgerIcon"
                            iconType={activePage === "home" ? "primary" : "secondary"}
                            inActive={activePage === "home" ? 0 : 1}
                            first={1} 
                        >
                            Конструктор
                        </HeaderButton>
                    </Link>
                    <Link to="/feed">
                        <HeaderButton
                            iconName="ListIcon"
                            iconType={activePage === "orders_tape" ? "primary" : "secondary"}
                            inActive={activePage === "orders_tape" ? 0 : 1}
                        >
                            Лента заказов
                        </HeaderButton>
                    </Link>
                </section>
                <section className={[styles.nav_block, styles.logo].join(" ")}>
                    <Link to="/">
                        <Logo />
                    </Link>
                </section>
                <section className={[styles.nav_block, styles.last].join(" ")}>
                    <Link to="/profile">
                        <HeaderButton
                            iconName="ProfileIcon"
                            iconType={activePage === "profile" ? "primary" : "secondary"}
                            inActive={activePage === "profile" ? 0 : 1}
                        >
                            Личный кабинет
                        </HeaderButton>
                    </Link>
                </section>
            </nav>
        </div>
    );
}

export default AppHeader
