import React, { Component, useCallback } from "react"
import { Field, formValues, reduxForm, SubmissionError } from "redux-form";
import "./style.scss"

const renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
        <div>
            <label>{label}</label>
            <div>
                <input className="form-control" {...input} placeholder={label} type={type} />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    )
}


function SignUp(props) {

    const { loginError } = props;
    const handleValue = useCallback(async (values) => {
        const { onRegisterUser } = props;
        const { name, email, phoneNumber, password, passwordRepeat } = values;

        if (!name) {
            throw new SubmissionError({
                name: 'please enter name',
                _error: 'Please fill the values!'
            })
        } else if (!email) {
            throw new SubmissionError({
                email: 'no email entered',
                _error: 'Please fill the values!'
            })
        } else if (!password || password.length < 7) {
            throw new SubmissionError({
                password: 'password must be more than 7 characters',
                _error: 'Please fill the values!'
            })
        } else if (!passwordRepeat || passwordRepeat.length < 7 ) {
            throw new SubmissionError({
                passwordRepeat: 'password must be more than 7 characters',
                _error: 'Please fill the values!'
            })
        } else if (passwordRepeat != password ) {
            throw new SubmissionError({
                passwordRepeat: 'both passwords must be same',
                _error: 'Please fill the values!'
            })
        } else if (!phoneNumber) {
            throw new SubmissionError({
                phoneNumber: 'not valid number',
                _error: 'Please fill the values!'
            })
        } 

        await onRegisterUser(values);
    }, []);

    const { handleSubmit, handleLogin, showLogin } = props;

    return (
        // <form onSubmit={handleSubmit(handleValue)}>
        //     <div>
        //         <label htmlFor="userName">User Name</label>
        //         <Field name="name" component={renderField} type="text" />
        //     </div>
        //     <div>
        //         <label htmlFor="email">Email</label>
        //         <Field name="email" component={renderField} type="email" />
        //     </div>
        //     <div>
        //         <label htmlFor="phoneNumber">Phone Number</label>
        //         <Field name="phoneNumber" component={renderField} type="text" />
        //     </div>
        //     <div>
        //         <label htmlFor="password">Password</label>
        //         <Field name="password" component={renderField} type="password" />
        //     </div>
        //     <div>
        //         {
        //             loginError ?
        //             loginError:
        //             ""
        //         }
        //     </div>
        //     <button type="submit">Submit</button>
        // </form>


        <div class="signup__container">
        <div class="container__child signup__thumbnail">
            <div class="thumbnail__logo">
            <h1 class="logo__text">FLA</h1>
            </div>
            <div class="thumbnail__content text-center">
            <h1 class="heading--primary">Welcome to Stock Market Predictor.</h1>
            <div class="heading--secondary">Are you ready to join the league?</div>
            </div>
            <div class="thumbnail__links">
            <ul class="list-inline m-b-0 text-center">
                {/* <li><a href="http://alexdevero.com/" target="_blank"><i class="fa fa-globe"></i></a></li>
                <li><a href="https://www.behance.net/alexdevero" target="_blank"><fa class="fa fa-behance"></fa></a></li>
                <li><a href="https://github.com/alexdevero" target="_blank"><i class="fa fa-github"></i></a></li>
                <li><a href="https://twitter.com/alexdevero" target="_blank"><i class="fa fa-twitter"></i></a></li> */}
            </ul>
            </div>
            <div class="signup__overlay"></div>
        </div>
        <div class="container__child signup__form">
            <form onSubmit={handleSubmit(handleValue)}>
            <div class="form-group">
                <label for="name">Username</label>
                <Field name="name"  component={renderField} type="text"  required={true} />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <Field name="email" component={renderField} type="email" required={true} />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <Field name="password" component={renderField} type="password" required={true} />
            </div>
            <div class="form-group">
                <label for="passwordRepeat">Repeat Password</label>
                <Field name="passwordRepeat" component={renderField} type="password" required={true} />
            </div>
            <div class="form-group">
                <label for="phoneNumber">Phone number</label>
                <Field name="phoneNumber" component={renderField} type="text" required={true} />
            </div>
                {
                    loginError ?
                    loginError:
                    ""
                }
            <div class="m-t-lg">
                <ul class="list-inline">
                <li>
                    <input class="btn btn--form register" type="submit" value="Register" />
                </li>
                <li>
                    <div class="signup__link" onClick={showLogin}>I am already a member</div>
                </li>
                </ul>
            </div>
            </form>  
        </div>
        </div>
    );
}


export default reduxForm({
    form: 'sign-up',
})(SignUp)