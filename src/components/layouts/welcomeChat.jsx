
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import socket from '../../socket/config';
import { useDispatch } from 'react-redux';
import { sendNewMessage, setNotification } from '../../redux/actions/ui';


function WelcomeChat({name, img}) {
    
    const [time, settime] = useState(moment().format("hh : mm : ss"))
    const [quote, setquote] = useState(()=>{
        const data = {
            eventName: "getTodayQuotes"
        }
        socket.emit('req', data )
    });
   
    const dispatch = useDispatch()  

    useEffect(() => {
        socket.on("res", res=>{
            const {eventName,data} = res
            
            if(eventName === "getTodayQuotes"){
                setquote(`${data.message}  - ${data.author}`)
            }
            if(eventName === "newMessage"){
                dispatch(setNotification(data))
                dispatch(sendNewMessage({message: data.messageFormate.message, userID: data.messageFormate.sender}))
            }
        })
        const timer = setTimeout(()=>{
                settime( moment().format("hh : mm : ss"))
        },1000)
        return () => {
            socket.off('res')
            clearInterval(timer);
        }
    },[time, dispatch])

    
    return (
        <div>
            <div className="container-welcome">
               <img src={img} alt=""/>
               <h1>{time}</h1>
               <h2>Welcome, {name} </h2>
               <p>{quote}</p>
            </div>
        </div>
    );
}

export default WelcomeChat;
