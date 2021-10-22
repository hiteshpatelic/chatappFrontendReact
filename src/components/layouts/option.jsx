import React from "react";
import { useHistory } from "react-router";


function Option() {
    const history =  useHistory();
  return (
    <div className="inline">
      <div className="left">
        <i data-tip="Setting" data-type="success"
          
          className="fas fa-cog"></i>        <i
          data-tip="Add contact"
          data-type="success"
          className="fas fa-user-plus"
          onClick={(e)=> history.push(`/chat/addContect`)}
        ></i>
      </div>
      <div className="right">
        <i
          className="fas fa-sign-out-alt"
          data-tip="logout"
          data-type="error"
          onClick={() => {
            localStorage.clear()
            history.push('/home')
          }}
        ></i>
      </div>
    </div>
  );
}

export default Option;
