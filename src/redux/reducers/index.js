import { combineReducers } from "redux";
import authReducer from '../reducers/auth/auth';
import profileReducer from '../reducers/profile/profile';

const reducers = combineReducers({
    authReducer, profileReducer
})
export default reducers;