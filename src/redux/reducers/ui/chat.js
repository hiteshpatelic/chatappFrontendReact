
import { actionTypes } from "../../constants";
const initialState = {
} 

const chatReducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case actionTypes.SET_CHAT_BY_ID:
            return { ...state, payload};

        default:
            return state;
    }
}

export default chatReducer;