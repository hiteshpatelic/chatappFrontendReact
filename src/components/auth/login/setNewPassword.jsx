import Joi from "joi";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import socket from "../../../socket/config";
import Button from "../../components/button";
import { errorToster, successToster } from "../../layouts/toster";
import passwordComplexity  from "joi-password-complexity";
import { useParams } from "react-router-dom";



const SetNewPassword = () =>{
    let {token} = useParams();

    const [error, seterror] = useState({});
    const [displayError, setdisplayError] = useState("none");
    const [otp, setotp] = useState("")
    const [password, setPassword] = useState("");
    let history = useHistory()

    const inputHandler = (e)=>{
        const {name, value} = e.target
        if(name === "number") setotp(value)
        if(name === "password") setPassword(value)
    }

    const formSubmitHandler = (e)=>{
        e.preventDefault()
        
        const numberValidation = Joi.object({
            otp: Joi.number().integer().min(100000).max(9999999).required()
        }).validate({otp:Number(otp)});
        
        const userRedableNumberError = {error:{details:[{context:{lable:"number"}}]}, message:"Please enter valid 6 digit OTP."}
        if(numberValidation.error) {
            seterror(userRedableNumberError);
            setdisplayError('block')
            setotp("")
            return true
        }
        const passwordError = passwordComplexity().label("password").validate(password);
        if(passwordError.error) {
            seterror(passwordError.error);
            setdisplayError('block')
            setPassword("")
            return true
        }
        if(!numberValidation.error && !passwordError.error){
            const data = {
                eventName: "setNewPassword",
                data:{ otp, password},
                token
            }
            socket.emit("req", data)
            console.log('emited');
        }
    }

    socket.off("res").on('res', res=>{
        const {eventName,data} = res
        console.log(eventName,data);
        if(eventName === "setNewPassword"){
            if(data.error){
                errorToster(data.message)
            }
            if(!data.error){
                successToster(data.message)
                history.push(`/home/login`)
            }
        }
    })

    return(
        <div className="login">
          <h3>Set new password</h3>
          <form onSubmit={formSubmitHandler}>
            <div className="error" style={{display:displayError}}>
                {   error.message? error.message : ""}
            </div>
            <div className="input">
              <label htmlFor="number">OTP Number</label>
              <input name="number" type="number" value={otp} onChange={inputHandler} placeholder="OTP number here......." />
            </div>
            <div className="input">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" value={password} onChange={inputHandler} placeholder="*************" />
            </div>
            <Button text={"Submit"} type={"submit"} />
          </form>
        </div>
    );
}

export default SetNewPassword;