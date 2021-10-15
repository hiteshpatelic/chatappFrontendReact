import { actionTypes } from '../constants';

export const setAuthToken = (token) =>{
    return {
        type: actionTypes.SET_TOKEN,
        payload: token
    }
}

export const clearAuthToken = () =>{
    return {
        type: actionTypes.REOVE_TOKEN,
    }
}

export const setUserID = (id) =>{
    return {
        type: actionTypes.SET_TOKEN,
        payload: id
    }
}