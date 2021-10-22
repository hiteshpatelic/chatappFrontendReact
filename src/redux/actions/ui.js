
import { actionTypes } from '../constants';

export const setChatOnUiById = (data) =>{
    return {
        type: actionTypes.SET_CHAT_BY_ID,
        payload: data
    }
}
