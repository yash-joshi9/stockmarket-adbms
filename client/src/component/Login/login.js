import React, { useCallback, useState } from "react"
import { Field, reduxForm, SubmissionError } from "redux-form";
import "./style.scss";

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

function Login(props) {



    const handleValue = useCallback(async (values) => {
        const { onHandleLoginUser, history } = props;
        let { email, password } = values;

        if (!email) {
            throw new SubmissionError({
                email: 'no email entered',
              _error: 'Login failed!'
            })
          } else if (!password) {
            throw new SubmissionError({
              password: 'no password',
              _error: 'Login failed!'
            })
          } 
        await onHandleLoginUser(values);
    }, []);

    const { error, handleSubmit, submitting, loginError, showSignUp } = props

    return (
        // <form onSubmit={handleSubmit(handleValue)}>
        //     <div>
        //         <label htmlFor="email">Email</label>
        //         <Field name="email" component={renderField} type="email" />
        //     </div>
        //     <div>
        //         <label htmlFor="password">Password</label>
        //         <Field name="password" component={renderField} type="password" />
        //     </div>
        //     {error && <strong>{error}</strong>}
        //     {loginError && <strong>{loginError}</strong>}
        //     <button type="submit" disabled={submitting}>
        //         Log In
        //     </button>
        // </form>


            <div class="signup__container login-containter">
            <div class="container__child signup__thumbnail">
                <div class="thumbnail__logo">
                <h1 class="logo__text">SM</h1>
                </div>
                <div class="thumbnail__content text-center">
                <h1 class="heading--primary">Welcome to Stock Market Predictor.</h1>
                <div class="heading--secondary">Dont have an account? No problem you can create one free of cost</div>
                </div>
                <div class="thumbnail__links">
                <ul class="list-inline m-b-0 text-center">
                </ul>
                </div>
                <div class="signup__overlay"></div>
            </div>
            <div class="container__child signup__form">
                <form onSubmit={handleSubmit(handleValue)}>
                <div class="form-group">
                    <label for="email">Email</label>
                    <Field name="email" component={renderField} type="email" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <Field name="password" component={renderField} type="password" />
                </div>
                <div class="m-t-lg">
                    <ul class="list-inline">
                    <li>
                        <input class="btn btn--form" type="submit" value="Login" />
                    </li>
                    <li>
                        <div class="signup__link" onClick={showSignUp}>Create an account?</div>
                    </li>
                    </ul>
                </div>
                </form>  
                {error && <strong>{error}</strong>}
                {loginError && <strong>{loginError}</strong>}
            </div>
            </div>



    );
}


export default reduxForm({
    form: 'login',
})(Login)