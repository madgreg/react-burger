import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/burger-icon";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/list-icon";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/profile-icon";
import React from "react";
import styles from "./header-button.module.css";

export default function HeaderButton({ iconName, iconType, inActive = 1, first = 0, children }) {
    let icon;
    
    switch (iconName) {
        case "ProfileIcon":
            icon = <ProfileIcon type={iconType} />;
            break;
        case "BurgerIcon":
            icon = <BurgerIcon type={iconType} />;
            break;
        case "ListIcon":
            icon = <ListIcon type={iconType} />;
            break;
        default:
            break;
    }
    let cssClassesDefaultArray = ["pl-5 pr-5", styles.nav_button, first ? "" : "ml-2"];

    return (
        <button className={cssClassesDefaultArray.join(" ")}>
            {icon}
            <span className={"pl-2 text text_type_main-default " + (inActive ? "text_color_inactive" : "")}>{children}</span>
        </button>
    );
}
