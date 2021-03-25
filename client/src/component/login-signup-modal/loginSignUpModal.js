import React, { useState } from 'react'
import Modal from "../Modal/Modal";
import LoginContainer from "../../container/LoginContainer";
import SignUpContainer from '../../container/signUpContainer';
import "./style.scss";


export default function LoginSignUpModal(props) {

    const [isLogin, setisLogin] = useState(false)

    const { onHandleShowLoginSignUp, onIsShowLoginSignUp } = props;

    const showLogin = () => {
        setisLogin(true)
    }

    
    const showSignUp = () => {
        setisLogin(false)
    }

    return (
        <Modal
            open={onIsShowLoginSignUp}
            ownClass="login-signup-modal"
            onClose={() => onHandleShowLoginSignUp(false)}
        >
            <div className="login-signup-container">
                <div className="header-bar">
                    <div
                        className={`header-text ${isLogin ? "is-selected" : ""}`}
                        onClick={() => setisLogin(true)}>
                        Login
                    </div>
                    <div
                        className={`header-text ${isLogin ? "" : "is-selected"}`}
                        onClick={() => setisLogin(false)}>
                        Sign-Up
                    </div>
                </div>

                {isLogin
                    ?
                    <LoginContainer 
                        showSignUp={showSignUp}
                    />
                    :
                    <SignUpContainer 
                        showLogin={showLogin}
                    />
                }
            </div>
        </Modal>
    )
}
