
import { actionTypes } from "../../constants";
const initialState = {
} 

const addnewMessage = (state, payload)=>{

    const newStateWithNewMessage = JSON.parse(JSON.stringify(state))
    if(newStateWithNewMessage.payload){
        if(payload.messageFormate.roomId === newStateWithNewMessage.payload._id){

            delete payload.messageFormate.roomId
            newStateWithNewMessage.payload.room.messages.push({
                ...payload.messageFormate
            });
        }
    }
    return newStateWithNewMessage
}


const chatReducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case actionTypes.SET_CHAT_BY_ID:
            return { ...state, payload};

        case actionTypes.SEND_MESSAGE:
            return addnewMessage(state,payload);
       
        default:
            return state;
    }
}

export default chatReducer;