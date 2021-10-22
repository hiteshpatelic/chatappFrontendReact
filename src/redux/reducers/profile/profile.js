
import { actionTypes } from "../../constants";
const initialState = {
    profile: {}
} 

const profileReducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case actionTypes.FETCH_USER_PROFILE:
            return { profile:payload};

        default:
            return state;
    }
}

export default profileReducer;