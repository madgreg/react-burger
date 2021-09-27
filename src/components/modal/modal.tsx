import React, { FC } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/close-icon";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { TModal } from "types";


const modalRoot= document.getElementById("modal-root");

const  Modal:FC<TModal> = ({ children, onClose, title, titleSize="text_type_main-large" })=>{
    React.useEffect(() => {
        const keyDown = (e) => {            
            if (e.code === "Escape") {
                onClose();
            }
        };
        window.document.addEventListener("keydown", keyDown, false);
        return () => window.document.removeEventListener("keydown", keyDown, false);
    }, [onClose]);
    return modalRoot && ReactDOM.createPortal(
        <ModalOverlay onClick={onClose}>
            <div
                className={[styles.modal, "p-10 pb-15"].join(" ")}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={`text ${titleSize}`}>
                    {title}
                    <span onClick={onClose} style={{ cursor: "pointer", float: "right" }}>
                        <CloseIcon type="primary" />
                    </span>
                </div>
                {children}
            </div>
        </ModalOverlay>,
        modalRoot
    );
}

export default Modal;
