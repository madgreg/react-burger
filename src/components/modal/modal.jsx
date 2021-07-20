import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/close-icon";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("modal-root");

const ModalOverlay = ({ children, onClick }) => {
    return (
        <div onClick={onClick} className={styles.modalOverlay}>
            {children}
        </div>
    );
};

export default function Modal({ children, onClose, title }) {
    React.useEffect(() => {
        const keyDown = (e) => {
            console.log(e.code);
            if (e.code === "Escape") {
                onClose();
            }
        };
        window.document.addEventListener("keydown", keyDown, false);
        return () => window.document.removeEventListener("keydown", keyDown, false);
    }, [onClose]);
    return ReactDOM.createPortal(
        <ModalOverlay onClick={onClose}>
            <div className={[styles.modal, "p-10 pb-15"].join(" ")} onClick={(e)=>{e.stopPropagation()}}>
                <div className="text text_type_main-large">
                    {title} 
                    <span onClick={onClose} style={{cursor: "pointer", float:"right"}}><CloseIcon type="primary" /></span>
                </div>                
                {children}
            </div>
        </ModalOverlay>,
        modalRoot
    );
}
