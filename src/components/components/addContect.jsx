import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { addcontectInputValidation } from '../../controller/validation';
import socket from '../../socket/config';
import { errorToster, successToster } from '../layouts/toster';



function AddContect() {
    

    const [username, setusername] = useState("");
    const [moNumber, setmoNumber] = useState("");
    const [error, seterror] = useState("")
    const [displayError, setdisplayError] = useState("none")
    const history = useHistory()

    socket.off("res").on('res', res=>{
        const {eventName,data} = res
        if(eventName === "addContact"){
            if(data.error){
                errorToster(data.message)
            }
            if(!data.error){
              successToster(data.message)
              history.push("/chat")
            }
        }
    })

    const inputHandler = (e)=>{
        const {name, value} = e.target
        if(name === "username") setusername(value)
        if(name === "moNumber") setmoNumber(value)
    }
    const formSubmitHandler = (e) =>{
        e.preventDefault()
        const {error} = addcontectInputValidation({username, moNumber: Number(moNumber)})
        if(error) {
            seterror(error);
            setdisplayError('block')
        }
        if(!error){
            setdisplayError('none')
            const token = localStorage.getItem('token');
            const data = {
                eventName: "addContact",
                data:{moNumber, username},
                token
            }
            socket.emit("req", data )
        }

    }

    return (
        <div className="addContect">
            <h3>Add new contect</h3>
            <form onSubmit={formSubmitHandler}>
                <div className="error" style={{display:displayError}}>
                    {   
                        error? error : ""
                    }
                </div>
                <div className="input">
                    <label htmlFor="password">Name</label><br/>
                    <input name="username" type="text" value={username} onChange={inputHandler} placeholder="Enter name here ...." />
                </div>
                <div className="input">
                    <label htmlFor="password">Number</label><br/>
                    <input name="moNumber" type="number" value={moNumber} onChange={inputHandler} placeholder="Enter mobile number here...." />
                </div>
                <button  type="submit">Add Contect</button>
            </form>
        </div>
    )
}

export default AddContect;
