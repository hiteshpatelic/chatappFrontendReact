import React, { useState } from 'react'
import passwordComplexity  from "joi-password-complexity";
import Button from "../../components/button";
import Joi from "joi";
import socket from "../../../socket/config"
import { errorToster, infoToster, successToster } from "../../layouts/toster";
import { useHistory } from "react-router-dom";



const Register = () =>{
    
    const [username, setusername] = useState("")
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState({})
    const [displayError, setdisplayError] = useState("none")
    const [profilePicture, setprofilePicture] = useState({})
    let history = useHistory()

    socket.off("res").on('res', res=>{
        const {eventName,data} = res

        if(eventName === "register"){
            if(data.error){
                errorToster(data.message)
            }
            if(!data.error){
                successToster(data.message)
                history.push(`/home/register/verify/${data.token}`)
            }
        }
        if(eventName === "otp"){
            infoToster(data.msg) 
            history.push(`/home/register/verify/${data.token}`)
        }
    })
    

    const inputHandler = (e) =>{
        const {name, value} = e.target
        if(name === "username") setusername(value)
        if(name === "number") setNumber(value)
        if(name === "password") setPassword(value)
        if(name === "profilePicture") {
            if(e.target.files[0]){
                setprofilePicture(e.target.files[0])
            }else{
                setprofilePicture({})
            }
        }
    }


    const inputValidation = ()=>{

        const {error} = Joi.object({
            profilePicture: Joi.object({}).required(),
            username: Joi.string().min(3).required()
        }).validate({username, profilePicture})
        if(error) {
            seterror(error);
            setdisplayError('block')
            setusername("")
            return true
        }
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
                eventName: "register",
                data:{username, moNumber: number, password, profilePicture}
            }
            socket.emit('req', data )
        } 
    }
    return (
        <div className="login">
          <h3>Register Page</h3>
          <form onSubmit={formSubmitHandler}>
            <div className="error" style={{display:displayError}}>
                {   error.message? error.message : ""}
            </div>
            <div className="image">
                {
                    profilePicture.name 
                    ? <img src={URL.createObjectURL(profilePicture)} alt=""/>
                    : ""
                }
            </div>
            <div className="input">
              <label htmlFor="profilePicture">Profile Picture</label>
              <input name="profilePicture" type="file" accept="image/*" onChange={inputHandler} />
            </div>
            <div className="input">
              <label htmlFor="number">User name</label>
              <input name="username" type="string" value={username} onChange={inputHandler} placeholder="Enter your name....." />
            </div>
            <div className="input">
              <label htmlFor="number">Mobile Number</label>
              <input name="number" type="number" value={number} onChange={inputHandler} placeholder="Enter your mobile number....." />
            </div>
            <div className="input">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" value={password} onChange={inputHandler} placeholder="*************" />
            </div>
            <Button text={"Register"} type={"submit"} />
          </form>
        </div>
    );
}
export default Register;