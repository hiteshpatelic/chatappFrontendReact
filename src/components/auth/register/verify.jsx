import Joi from "joi";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import socket from "../../../socket/config";
import Button from "../../components/button";
import { errorToster, successToster } from "../../layouts/toster";


const VerifyRegisterUser = () =>{
    let {token} = useParams();

    const [error, seterror] = useState({});
    const [displayError, setdisplayError] = useState("none");
    const [otp, setotp] = useState("")
    let history = useHistory()

    const inputHandler = (e)=>{
        const {name, value} = e.target
        if(name === "otp") setotp(value)
    }

    const formSubmitHandler = (e)=>{
        e.preventDefault()
        
        const {error} = Joi.object({
            otp: Joi.number().integer().min(100000).max(999999).required()
        }).validate({otp:Number(otp)});

        const userRedableNumberError = {error:{details:[{context:{lable:"number"}}]}, message:"Please enter valid, 6 digit OTP."}
        if(error) {
            seterror(userRedableNumberError);
            setdisplayError('block')
            setotp("")
        }
        if(!error){
            const data = {
                eventName: "verifyRegisterWithOTP",
                data:{token, otp}
            }
            socket.emit("req", data)
        }


    }

    socket.off("res").on('res', res=>{
        const {eventName,data} = res
        if(eventName === "verifyRegisterWithOTP"){
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
          <h3>Verify mobile number</h3>
          <form onSubmit={formSubmitHandler}>
            <div className="error" style={{display:displayError}}>
                {   error.message? error.message : ""}
            </div>
            <div className="input">
              <label htmlFor="otp">Your OTP</label>
              <input name="otp" type="password" value={otp} onChange={inputHandler} placeholder="*************" />
            </div>
            <Link className="link" to="/home/register/resendOTP">Resend OTP</Link>
            <Button text={"Verify"} type={"submit"} />
          </form>
        </div>
    );
}

export default VerifyRegisterUser;