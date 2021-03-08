import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useDetectOutsideClick } from "../useDetectOutsideClick";


export default function DropDown(props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  

  const onClick = (e) => {
    setIsActive(!isActive);
  }
  const { name, children } = props;

  return (
    <div className="container">
      <div className="menu-container">
        <div onClick={onClick} className="menu-trigger">
          <span>{name}</span>
        </div>
        <nav
          ref={dropdownRef}
          onClick={onClick}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          {children}
        </nav>
      </div>
    </div>
  );
}
