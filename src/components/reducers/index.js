import cartReducer from "./CartReducer";
import authReducer from "./AuthReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer
});

export default rootReducer
