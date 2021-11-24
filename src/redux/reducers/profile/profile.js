
import { actionTypes } from "../../constants";
const initialState = {
    profile: {}
} 
const setChatHistory = (state,payload, condition)=>{
    const newState = JSON.parse(JSON.stringify(state))
    newState.profile.contactList = newState.profile.contactList.map((userList)=>{
        if(!condition){
            if(userList.id === payload){
                userList.openOrClose = condition
                userList.notification = 0;
            }
        }else{
            if(userList.id === payload){
                userList.openOrClose = condition
                userList.notification = 0;
            }
        }
        return userList
    })
    return newState
}

const pushnotification = (state, payload)=>{
    const newState = JSON.parse(JSON.stringify(state))
    newState.profile.contactList = newState.profile.contactList.map((userList)=>{
        if(userList.id === payload.messageFormate.sender){
            if(userList.openOrClose === false){
                userList.notification = userList.notification +1
            }
        }
        return userList
    })
    return newState
}
const addNewContect = (state, payload)=>{
    const newState = JSON.parse(JSON.stringify(state))
    newState.profile.contactList.push(payload)
    return newState
}

const profileReducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case actionTypes.FETCH_USER_PROFILE:
            return { profile:payload};

        case actionTypes.SET_CHATHISTORY_BOX_OPEN:
            return setChatHistory(state,payload, true);

        case actionTypes.SET_CHATHISTORY_BOX_CLOSE:
            return setChatHistory(state,payload, false);

        case actionTypes.ADD_NOTIFICATION:
            return pushnotification(state,payload);

        case actionTypes.ADD_NEW_CONTECT:
            return addNewContect(state,payload);

        default:
            return state;
    }
}

export default profileReducer;