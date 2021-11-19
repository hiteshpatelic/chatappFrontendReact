
import { actionTypes } from '../constants';

export const setChatOnUiById = (data) =>{
    console.log(data);
    return {
        type: actionTypes.SET_CHAT_BY_ID,
        payload: data
    }
}

export const sendNewMessage = (data) =>{
    return {
        type: actionTypes.SEND_MESSAGE,
        payload: data
    }
}