import React from 'react'
import { Fragment } from 'react/cjs/react.production.min'
import { Link} from "react-router-dom";
import IMG from './components/components/img';
import logo from './components/assets/images/logo/logo.png'
import './components/assets/style/welcome.scss';
import { Route } from 'react-router-dom';
import Login from "./components/auth/login/login"
import Register from "./components/auth/register/register"
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import phone from "./components/assets/images/top-mobile.png"
import 'react-toastify/dist/ReactToastify.css';
import VerifyRegisterUser from './components/auth/register/verify';
import ResendVerifyOTP from './components/auth/register/resendVerifyOTP';
import ForgotePassword from './components/auth/login/forgotePassword';
import SetNewPassword from './components/auth/login/setNewPassword';




const WelcomeDetail = () =>{
    return(
        <div className="detail">
            <div className="info">
                <h1>The best way to connect with your friends is with</h1>
                <h2> _ChatApp</h2>
                <p>Connect with People all over the world , with your any device </p>
            </div>
            <div className="img">
                <IMG link={phone}/>
            </div>
        </div>
    )
}
const Welcome = ()=>{
    return(
        <Fragment>
            <div className="welcome-container">
                <div className="navbar">
                    <div className="left">
                        <IMG link={logo}/>
                        <h2>_ChatApp</h2>
                    </div>
                    <div className="link">
                        <Link className="link" to="/home/home">Home</Link>
                        <Link className="link" to="/home/login">Login</Link>
                        <Link className="link" to="/home/register">Register</Link>
                    </div>
                </div>
                <div className="content">
                    <Route path="/home/register" exact   component={Register}/>
                    <Route path="/home/register/verify/:token" render={(props)=><VerifyRegisterUser {...props}/>}/>
                    <Route path="/home/register/resendOTP" component={ResendVerifyOTP}/>
                    <Route path="/home/register/resetPassword" component={ForgotePassword}/>
                    <Route path="/home/register/setNewPassword/:token" component={SetNewPassword}/>
                    <Route path="/home/home" component={WelcomeDetail}/>
                    <Route path="/home/login" component={Login}/>
                    <Redirect from="/home" to="/home/home"/>
                </div>
            </div>
        </Fragment>
    )
}
export default Welcome;