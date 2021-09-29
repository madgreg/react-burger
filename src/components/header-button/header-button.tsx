import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/burger-icon";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/list-icon";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/profile-icon";
import React, { FC } from "react";
import styles from "./header-button.module.css";
import { THeaderButton } from "types";

const HeaderButton: FC<THeaderButton> = ({ iconName, iconType, inActive = 1, first = 0, children, onClick=()=>{} })=>{
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
        <button className={cssClassesDefaultArray.join(" ")} onClick={onClick}>
            {icon}
            <span className={"pl-2 text text_type_main-default " + (inActive ? "text_color_inactive" : "")}>{children}</span>
        </button>
    );

} 



export default HeaderButton