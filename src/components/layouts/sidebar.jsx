import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Fragment } from "react/cjs/react.production.min";
import socket from "../../socket/config";
import Logo from "./logo";
import Option from "./option";


const ContactList = () => {
  const profile = useSelector(state => state.profileReducer.profile)
  const history = useHistory()  
  const token = localStorage.getItem('token');
  return profile.contactList.map((e) => {

    const data = {
      eventName: "joinRoom",
      data:e.roomId,
      token
  }
    socket.emit('req',data)
    return (
      <div className="list" key={e._id}>
        <div className="left">
          <img src={e.profilePicture} alt="" />
        </div>
        <div className="detail" onClick={()=> history.push(`/chat/user/${e.id}`)}>
            <h3>{e.username}</h3>
            <p>{e.lastMessage}</p>
        </div>
        <div className="notification"></div>
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
