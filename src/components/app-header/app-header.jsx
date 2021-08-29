import { Logo } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";
import React from "react";
import HeaderButton from "../header-button/header-button";
import { Link } from "react-router-dom";
import styles from "./app-header.module.css";

export default function AppHeader() {
    return (
        <div className={styles.app_head}>
            <nav className={styles.head_nav}>
                <section className={styles.nav_block}>
                    <HeaderButton iconName="BurgerIcon" iconType="primary" inActive={0} first={1}>
                        Конструктор
                    </HeaderButton>
                    <HeaderButton iconName="ListIcon" iconType="secondary">
                        Лента заказов
                    </HeaderButton>
                </section>
                <section className={[styles.nav_block, styles.logo].join(" ")}>
                    <Logo />
                </section>
                <section className={[styles.nav_block, styles.last].join(" ")}>
                    <Link to="/profile">
                        <HeaderButton iconName="ProfileIcon" iconType="secondary">
                            Личный кабинет
                        </HeaderButton>
                    </Link>
                </section>
            </nav>
        </div>
    );
}
