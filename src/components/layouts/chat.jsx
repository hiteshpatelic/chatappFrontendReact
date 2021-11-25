
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Button from '../components/button';
import IMG from '../components/img';
import socket from '../../socket/config';
import {sendNewMessage, setChatHistoryOpenFalse, setChatOnUiById, setNotification} from "../../redux/actions/ui"
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatHistory = () =>{

    const history = useHistory()
    const dispatch = useDispatch();
    const [message, setMessage] = useState("")
    let { id } = useParams();
    const token = localStorage.getItem('token');
    
    const getUserInfoFromContactList = useSelector(state => {
        return state.profileReducer.profile.contactList.filter(e=>e.id === id)
    })
    const {profilePicture, username, roomId, number} = getUserInfoFromContactList[0];
    const {payload} = useSelector(state => state.chatReducer)
    const userID = useSelector(state => state.profileReducer.profile._id)
    
    if(!payload || (payload && payload._id !== roomId) ){
        const data = {
            eventName: "getChatHistotyById",
            data:{id , roomId},
            token
        }
        socket.emit('req', data )
    }
    
    useEffect(() => {
        socket.on("res", res=>{
            const {eventName,data} = res
            if(eventName === "getChatHistotyById"){
                dispatch(setChatOnUiById(data))
            }
            if(eventName === "newMessage"){
                dispatch(setNotification(data))
                dispatch(sendNewMessage(data))
            }
        })
        return () => {
            socket.off('res')
        }
    }, [dispatch])

    // * message input handler 
    const inputHandler = (e)=>{
        const {name, value} = e.target
        if(name === "message") setMessage(value)
    }
     
    // * send Message
    const sendMessage =(e)=>{
        e.preventDefault()
        if(message.trim() === "") return
        const data = {
            eventName: "sendMessage",
            data:{roomId, message},
            token
        }
        const msgObject = {
            messageFormate:{
                message,roomId, sender:userID 
            }
        }
        dispatch(sendNewMessage(msgObject))
        socket.emit("req", data)
        setMessage("")
    }

    const back  = (<i className="fas fa-chevron-left"></i>)
    const menu = (<i className="fas fa-bars"></i>)
    const send = (<i className="fas fa-paper-plane"></i>)
    return(
        <div className="container">
            <div className="top">
                <div className="left">
                    <div className="back-btn" onClick={()=> {dispatch(setChatHistoryOpenFalse(id)); history.push(`/chat`)}}>
                        <Button text={back}  />
                    </div>
                    <IMG link={profilePicture}></IMG>
                    <div className="profileinfo">
                        <h3>{username === "unKnown"? number : username}</h3>
                    </div>
                </div>
                <div className="option">
                    <Button text={menu}/>
                </div>
            </div>
            <ScrollToBottom className="chatHistory" >
                {
                    payload?
                    payload.room.messages.length >0 ?
                    payload.room.messages.map((e,i)=>{
                        return <div key={i} className={e.sender=== userID? "right" : "left"}>
                            <p>{e.message}</p>
                        </div>
                    })
                    :"":""
                }
            </ScrollToBottom>
            <form onSubmit={sendMessage} className="sendMessage">
                <input name="message" value={message}  onChange={inputHandler} placeholder="Enter your message.........."/> 
                <Button type="submit" text={send}/>
            </form>
        </div>
    );
}

export default ChatHistory;