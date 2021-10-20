
import { actionTypes } from "../../constants";
const initialState = {
    auth: {}
}

const authReducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case actionTypes.SET_TOKEN:

            return {auth:{token:payload}};
          
        case actionTypes.REOVE_TOKEN:
            return state;
           
        case actionTypes.SET_USER_ID:
            return state;

        default:
            return state;
    }
}

export default authReducer;