import React from "react";
import { useHistory } from "react-router";
import { Fragment } from "react/cjs/react.production.min";
import IMG from "../components/img";
import Logo from "./logo";


const data = [
  {
    img: "https://i.pravatar.cc/50",
    name: "hitesh chaudhary",
    lastMessage: "hy how are you",
    usreId: "132456",
  },
  {
    img: "https://i.pravatar.cc/50",
    name: "darsh raval",
    lastMessage: "hy how are you",
    usreId: "1324454456",
  },
  {
    img: "https://i.pravatar.cc/50",
    name: "jitendra panchal",
    lastMessage: "hy how are you",
    usreId: "132456132",
  },
];

const ContactList = () => {
    const history = useHistory()
  return data.map((e) => {
    return (
      <div className="list" key={e.usreId}>
        <div className="left">
          <IMG link={e.img}></IMG>
        </div>
        <div className="detail" onClick={()=> history.push(`/chat/${e.usreId}`)}>
            <h3>{e.name}</h3>
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
    </Fragment>
  );
};

export default Sidebar;
