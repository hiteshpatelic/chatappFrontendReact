
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import socket from '../../socket/config';


function WelcomeChat({name, img}) {
    
 
    const [time, settime] = useState(moment().format("hh : mm : ss"))
    const [quote, setquote] = useState(()=>{
        const data = {
            eventName: "getTodayQuotes"
        }
        socket.emit('req', data )
    });

    socket.off("res").on('res', res=>{
        const {eventName,data} = res
        if(eventName === "getTodayQuotes"){
            setquote(`${data.message}  - ${data.author}`)
        }
    })
   
    useEffect(() => {
        const timer = setTimeout(()=>{
                settime( moment().format("hh : mm : ss"))
        },1000)
        return () => {
            clearInterval(timer);
        }
    },[time])

    
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
