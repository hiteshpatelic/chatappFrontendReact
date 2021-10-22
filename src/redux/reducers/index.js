import { combineReducers } from "redux";
import authReducer from '../reducers/auth/auth';
import profileReducer from '../reducers/profile/profile';
import chatReducer from '../reducers/ui/chat';

const reducers = combineReducers({
    authReducer, profileReducer, chatReducer
})
export default reducers;