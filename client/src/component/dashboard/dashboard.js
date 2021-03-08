import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./style.scss";


function Dashboard(props) {
    const [isOpen, setisOpen] = useState(false);

    const handleHere = () => {
        const { history } =  props; 
        history.push("/create-a-team");
    }

    const { name, email, phoneNumber } = props;
    return (
        <div className="dashboard-section">
            <div className="background-wrapper" />
            <div className="section-main-start">
                <div className="greet-msg">
                    Hello, {name}
                    <div className="greet-text">
                        Create your fantasy team <span onClick={handleHere}> here </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
