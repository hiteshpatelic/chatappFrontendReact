
import React from 'react'
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import Button from '../components/button';
import IMG from '../components/img';
import Input from '../components/input';

const ChatHistory = () =>{

    let { id } = useParams();

    const history = useHistory()
    const {imgLink, name, lastSeen} = id;
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
                    <IMG link={imgLink}></IMG>
                    <div className="profileinfo">
                        <h3>{name}</h3>
                        <p>{lastSeen}</p>
                    </div>
                </div>
                <div className="option">
                    <Button text={menu}/>
                </div>
            </div>
            <div className="chatHistory">
                
            </div>
            <div className="sendMessage">
                <Input name="message" placeholder="Enter your message.........."/> 
                <Button text={send}/>
            </div>
        </div>
    );
}

export default ChatHistory;