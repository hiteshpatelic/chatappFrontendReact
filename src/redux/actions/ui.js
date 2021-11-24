
import { actionTypes } from '../constants';

export const setChatOnUiById = (data) =>{
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
export const setChatHistoryOpenTrue = (data) =>{
    return {
        type: actionTypes.SET_CHATHISTORY_BOX_OPEN,
        payload: data
    }
}
export const setChatHistoryOpenFalse = (data) =>{
    return {
        type: actionTypes.SET_CHATHISTORY_BOX_CLOSE,
        payload: data
    }
}
export const setNotification = (data) =>{
    return {
        type: actionTypes.ADD_NOTIFICATION,
        payload: data
    }
}
export const addNewContect = (data) =>{
    return {
        type: actionTypes.ADD_NEW_CONTECT,
        payload: data
    }
}