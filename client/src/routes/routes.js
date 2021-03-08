import {Switch, Route, Redirect} from "react-router";
import React, { Fragment } from "react";

import FooterComponent from "../component/Footer/Footer";
import HeaderComponent from "../container/headerContainer";
// import SignUpContainer from "../container/signUpContainer";
// import LoginContainer from "../container/LoginContainer";
import dashboardContainer from "../container/dashboardContainer";
import Cookies from "universal-cookie";
import AboutUs from "../component/AboutUs/AboutUs" 
import HelpPage from "../component/HelpPage/HelpPage";


const cookies = new Cookies();


const getHeaderFooter = (content) => {
    return (
        <Fragment>
            <HeaderComponent />
            <div className="section-main-container">
                {content}
            </div>
            <FooterComponent />
        </Fragment>
    )
}



export const Routes = () => {
    return (
        <Switch>
            {
                getHeaderFooter(
                    <Fragment>
                        <ProtectedRoute
                            path="/dashboard"
                            exact={true} 
                            component={dashboardContainer}
                        />
                       
                        <Route path="/help-page" exact={true} component={HelpPage} />
                        {/* <Route path="/sign-up" exact={true} component={SignUpContainer} /> */}
                        {/* <Route path="/login" exact={true} component={LoginContainer} /> */}
                        {/* <Route component={ErrorPage404} /> */}
                        <Route path="/AboutUs" exact={true} component={AboutUs} />

                    </Fragment>
                )
            }
        </Switch>
    );

}



const ProtectedRoute = ({component: Component, ...rest}) => {

    const isAuth = cookies.get("authToken");
return (

    isAuth ?
    <Route {...rest} render={
        (props) => {
            return <Component  {...props}/>
        }
    } />
    :
    <Redirect path="/"/>
)

}