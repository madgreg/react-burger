import { Logo } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";
import React from "react";
import HeaderButton from "../header-button/header-button";
import { Link } from "react-router-dom";
import styles from "./app-header.module.css";
import { useSelector } from "react-redux";

export default function AppHeader() {
    const { activePage } = useSelector((store) => store.appInfo);
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
                        <HeaderButton iconName="ListIcon" iconType="secondary">
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
