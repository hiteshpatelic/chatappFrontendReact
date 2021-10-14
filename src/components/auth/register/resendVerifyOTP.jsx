import Joi from "joi";
import React, { useState } from "react";
import {  useHistory } from "react-router-dom";
import socket from "../../../socket/config";
import Button from "../../components/button";
import { errorToster, successToster } from "../../layouts/toster";


const ResendVerifyOTP = () =>{

    const [error, seterror] = useState({});
    const [displayError, setdisplayError] = useState("none");
    const [number, setNumber] = useState("")
    let history = useHistory()

    const inputHandler = (e)=>{
        const {name, value} = e.target
        if(name === "number") setNumber(value)
    }

    const formSubmitHandler = (e)=>{
        e.preventDefault()
        
        const numberValidation = Joi.object({
            number: Joi.number().integer().min(1111111111).max(9999999999).required()
        }).validate({number:Number(number)});
        
        const userRedableNumberError = {error:{details:[{context:{lable:"number"}}]}, message:"Please enter valid 10 digit mobile number."}
        if(numberValidation.error) {
            seterror(userRedableNumberError);
            setdisplayError('block')
            setNumber("")
            return true
        }
        if(!numberValidation.error){
            const data = {
                eventName: "resendRegisterVerifiedOTP",
                data:{number}
            }
            socket.emit("req", data)
            console.log('emited');
        }
    }

    socket.off("res").on('res', res=>{
        const {eventName,data} = res
        console.log(eventName,data);
        if(eventName === "resendRegisterVerifiedOTP"){
            if(data.error){
                errorToster(data.message)
            }
            if(!data.error){
                successToster(data.message)
                history.push(`/home/register/verify/${data.token}`)
            }
        }
    })

    return(
        <div className="login">
          <h3>Resend OTP on number</h3>
          <form onSubmit={formSubmitHandler}>
            <div className="error" style={{display:displayError}}>
                {   error.message? error.message : ""}
            </div>
            <div className="input">
              <label htmlFor="number">Your Mobile Number</label>
              <input name="number" type="number" value={number} onChange={inputHandler} placeholder="Your mobile number here......." />
            </div>
            <Button text={"Resend"} type={"submit"} />
          </form>
        </div>
    );
}

export default ResendVerifyOTP;