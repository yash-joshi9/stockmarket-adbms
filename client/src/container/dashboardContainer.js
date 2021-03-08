import { connect } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import Dashboard from "../component/dashboard/dashboard"
import { bindActionCreators } from "redux"
import cookies from "../cookie/cookie";
import { getUserById } from "../action/dashboard"

function DashboardContainer(props) {

    const [isLoading, setisLoading] = useState(true);
    
    // useEffect(() => {
    //     const { onGetUserById } = props;
    //     const userId = cookies.get("userId");
    //     onGetUserById(userId).then(() => {
    //         setisLoading(false)
    //     });

    // }, [])

    return (

        // isLoading ?
            // ""
            // :
            <Dashboard
                {...props}
            // initialValues={{
            //     firstName: "abcd"
            // }}
            />
    );
}



const mapStateToProps = (state) => {
    const {
        user
    } = state
    return {
        ...user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({
            onGetUserById: getUserById
        },
            dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);