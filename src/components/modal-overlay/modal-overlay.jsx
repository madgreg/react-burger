
import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay ({ children, onClick }) {
    return (
        <div onClick={onClick} className={styles.modalOverlay}>
            {children}
        </div>
    );
};

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired, 
    onClick: PropTypes.func
};