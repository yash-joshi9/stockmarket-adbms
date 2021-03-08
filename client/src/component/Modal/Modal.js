import React, { useState } from 'react'
import ReactDom from "react-dom";
import "./style.scss";


export default function Modal({ children, open, onClose, ownClass }) {

    if (!open) {
        return null
    }

    const closeImg = "http://joshi24.myweb.cs.uwindsor.ca/static-img/closeImg.svg";

    return ReactDom.createPortal(
        <div className={`modal-overlay ${ownClass}`}>
            <div className="modal-section-main">
                <div className="close-button" onClick={() => onClose()}> 
                    <img src={closeImg} className="cross-img"/>
                </div>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}
