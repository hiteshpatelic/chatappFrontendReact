import Joi from "joi";
import React from "react";
import { useState } from "react";
import Button from "../../components/button";
import passwordComplexity  from "joi-password-complexity";
import socket from "../../../socket/config"
import { errorToster, successToster } from "../../layouts/toster";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setAuthToken} from '../../../redux/actions/auth'
import { fetchUserProfile } from "../../../redux/actions/profile";

const Login = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState({})
  const [displayError, setdisplayError] = useState("none")
  let history = useHistory();
  const dispatch = useDispatch();



  socket.off("res").on('res', res=>{
      const {eventName,data} = res
      if(eventName === "login"){
          if(data.error){
              errorToster(data.message)
          }
          if(!data.error){
            successToster(data.message)
            localStorage.setItem('token', data.token);
            const eventdata = {
              eventName: "getUserProfileInfo",
              token: data.token
            } 
            socket.emit('req', eventdata )
            dispatch(setAuthToken(data.token))
            
          }
      }
      socket.off('res').on("res", res=>{
        const {eventName,data} = res
        if(eventName === "getUserProfileInfo"){
          const final = JSON.parse(JSON.stringify(data))
          final.contactList = final.contactList.map((list)=>{
              list.notification = 0
              list.openOrClose = false
              return list
          })
          dispatch(fetchUserProfile(final))
          history.push("/chat")
        }
      })
  })

 
  const inputHandler = (e) =>{
    const {name, value} = e.target
    if(name === "number") setNumber(value)
    if(name === "password") setPassword(value)
  }

  const inputValidation = ()=>{
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
     const passwordError = passwordComplexity().label("password").validate(password);
     if(passwordError.error) {
        seterror(passwordError.error);
        setdisplayError('block')
        setPassword("")
        return true
     }
    }

    

    const formSubmitHandler = (e) =>{
        e.preventDefault()
        const validationError = inputValidation()
        if(!validationError){
            if(error) {
                seterror("");
                setdisplayError("none")
            }

            const data = {
                eventName: "login",
                data:{moNumber: number, password}
            }
            socket.emit('req', data )
        } 
    }

    

  return (
    <div className="login">
      <h3>Login Page</h3>
      <form onSubmit={formSubmitHandler}>
        <div className="input">
            <div className="error" style={{display:displayError}}>
                {   
                    error.message? error.message : ""
                }
            </div>
          <label htmlFor="number">Mobile Number</label>
          <input name="number" type="number" value={number} onChange={inputHandler} placeholder="Enter your mobile number....." />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" value={password} onChange={inputHandler} placeholder="*************" />
        </div>
        <p className="forgotpassword"><Link className="link" to='/home/register/resetPassword'>Forgote your password?</Link></p>
        <Button text={"Login"} type={"submit"} />
      </form>
    </div>
  );
};
export default Login;
