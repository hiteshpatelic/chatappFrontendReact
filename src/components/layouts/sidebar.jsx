import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Fragment } from "react/cjs/react.production.min";
import {  setChatHistoryOpenFalse, setChatHistoryOpenTrue } from "../../redux/actions/ui";
import socket from "../../socket/config";
import Logo from "./logo";
import Option from "./option";


const ContactList = () => {
  const profile = useSelector(state => state.profileReducer.profile)
  const history = useHistory()
  const dispatch = useDispatch()  
  
  const token = localStorage.getItem('token');

  

  return profile.contactList.map((e) => {

  const data = {
    eventName: "joinRoom",
    data:e.roomId,
    token
  }

  const openChatDetail = ()=>{
    dispatch(setChatHistoryOpenFalse(e.id))
    dispatch(setChatHistoryOpenTrue(e.id))
    return history.push(`/chat/user/${e.id}`)
  }
    socket.emit('req', data)
    return (
      <div className="list" key={e._id} onClick={openChatDetail}>
        <div className="imageWithName">
          <div className="left">
            <img src={e.profilePicture} alt="" />
          </div>
          <div className="detail" >
              <h3>{e.username === "unKnown" ? e.number : e.username}</h3>
              <p>{e.lastMessage}</p>
          </div>
        </div>
        <div className="notification" style={{display : e.notification? "block": "none"}}>
          <p>{e.notification? e.notification : ""}</p>
        </div>
      </div>
    );
  });
};

const Sidebar = () => {
  
  return (
    <Fragment>
      <Logo />
      <div className="contactList">
        <ContactList  />
      </div>
      <Option/>      
    </Fragment>
  );
};

export default Sidebar;
