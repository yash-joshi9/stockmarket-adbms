import { connect } from "react-redux";
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import SignUp from "../component/SignUp/signUp";
import { registerUser } from "../action/register"

class SignUpContainer extends Component {

    render() {
        return (
            <SignUp
                {...this.props}
                // initialValues={{
                //     firstName: "abcd"
                // }}
            />
        );
    }
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
            onRegisterUser: registerUser
        },
        dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);