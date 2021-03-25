import { combineReducers } from "redux";
import user from "./user";
import stocks from "./stocks";
import dashboard from "./dashboard"
import {reducer  as formReducer} from "redux-form";


const allReducers = combineReducers({
    user,
    dashboard,
    stocks,
    form: formReducer
});

export default allReducers;

