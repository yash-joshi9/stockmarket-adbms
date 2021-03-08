import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";

class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        );
    }
}

export default Index;