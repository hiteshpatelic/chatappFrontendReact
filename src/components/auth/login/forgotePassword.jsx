import Joi from "joi";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import socket from "../../../socket/config";
import Button from "../../components/button";
import { errorToster, successToster } from "../../layouts/toster";


const ForgotePassword = () =>{

    const [error, seterror] = useState({});
    const [displayError, setdisplayError] = useState("none");
    const [moNumber, setNumber] = useState("")
    let history = useHistory()


    socket.off("res").on('res', res=>{
        const {eventName,data} = res
        console.log(eventName,data,123);

        if(eventName === "resetPassword"){
            if(data.error){
                errorToster(data.message)
            }
            if(!data.error){
                console.log('caled');
                successToster(data.message)
                history.push(`/home/register/setNewPassword/${data.token}`)
            }
        }
    })

    const inputHandler = (e)=>{
        const {name, value} = e.target
        if(name === "number") setNumber(value)
    }

    const formSubmitHandler = (e)=>{
        e.preventDefault()
        
        const numberValidation = Joi.object({
            moNumber: Joi.number().integer().min(1111111111).max(9999999999).required()
        }).validate({moNumber:Number(moNumber)});
        
        const userRedableNumberError = {error:{details:[{context:{lable:"number"}}]}, message:"Please enter valid 10 digit mobile number."}
        if(numberValidation.error) {
            seterror(userRedableNumberError);
            setdisplayError('block')
            setNumber("")
            return true
        }
        if(!numberValidation.error){
            const data = {
                eventName: "resetPassword",
                data:{moNumber}
            }
            socket.emit("req", data)
        }
    }

    
    return(
        <div className="login">
          <h3>Forgote Password</h3>
          <form onSubmit={formSubmitHandler}>
            <div className="error" style={{display:displayError}}>
                {   error.message? error.message : ""}
            </div>
            <div className="input">
              <label htmlFor="number">Your Mobile Number</label>
              <input name="number" type="number" value={moNumber} onChange={inputHandler} placeholder="Your mobile number here......." />
            </div>
            <Button text={"Reset Password"} type={"submit"} />
          </form>
        </div>
    );
}

export default ForgotePassword;