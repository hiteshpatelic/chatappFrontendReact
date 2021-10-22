
import { actionTypes } from '../constants';

export const fetchUserProfile = (data) =>{
    return {
        type: actionTypes.FETCH_USER_PROFILE,
        payload: data
    }
}
