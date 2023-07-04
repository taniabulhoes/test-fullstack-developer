import React from "react";
import { ReactNode } from "react"
import ReactDOM from "react-dom";

import { Container } from "./modal.styles"
import { AiOutlineCloseCircle } from "react-icons/ai";

type ModalProps = {
    onClose: React.Dispatch<React.SetStateAction<boolean>>,
    children: ReactNode
    className: string
    title: string
}

const Modal = ({ onClose, children, className, title}: ModalProps) => {
    const el = document.getElementById("modal-root") as HTMLElement

    const handleCloseClick = () => {
        onClose(false);
    };

    const modalContent = (
        <Container className={className}>
            <div className="modalWrapper">
                <div className="modal">
                    <div className="modalHeader">
                        <h1>{title}</h1>
                            <AiOutlineCloseCircle role="button" onClick={handleCloseClick}/>
                        </div>
                    <div className="modalBody">{children}</div>
                </div>
            </div>
        </Container>
    );

    return ReactDOM.createPortal(
        modalContent,
        el
    );
};

export default Modal