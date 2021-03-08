import { combineReducers } from "redux";
import user from "./user";
import dashboard from "./dashboard"
import {reducer  as formReducer} from "redux-form";


const allReducers = combineReducers({
    user,
    dashboard,
    form: formReducer
});

export default allReducers;

