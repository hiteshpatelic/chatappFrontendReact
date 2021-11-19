
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Button from '../components/button';
import IMG from '../components/img';
import socket from '../../socket/config';
import {sendNewMessage, setChatOnUiById} from "../../redux/actions/ui"
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
    const {profilePicture, username, roomId} = getUserInfoFromContactList[0];
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
            console.log(res);
            const {eventName,data} = res
            if(eventName === "getChatHistotyById"){
                dispatch(setChatOnUiById(data))
            }
            if(eventName === "newMessage"){
                console.log(res);
                dispatch(sendNewMessage({message: data.message, userID: data.sender}))
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
    const sendMessage =()=>{
        if(message.trim() === "") return
        const data = {
            eventName: "sendMessage",
            data:{roomId, message},
            token
        }
        dispatch(sendNewMessage({message, userID}))
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
                    <div className="back-btn" onClick={()=> history.push(`/chat`)}>
                        <Button text={back}  />
                    </div>
                    <IMG link={profilePicture}></IMG>
                    <div className="profileinfo">
                        <h3>{username}</h3>
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
            <div className="sendMessage">
                <input name="message" value={message}  onChange={inputHandler} placeholder="Enter your message.........."/> 
                <Button onClick={sendMessage} text={send}/>
            </div>
        </div>
    );
}

export default ChatHistory;