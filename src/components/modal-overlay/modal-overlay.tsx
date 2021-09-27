import React, { FC } from "react";
import styles from "./modal-overlay.module.css";
import { TModalOverlay } from "types";

const ModalOverlay: FC<TModalOverlay> = ({ children, onClick }) => {
    return (
        <div onClick={onClick} className={styles.modalOverlay}>
            {children}
        </div>
    );
};

export default ModalOverlay;
