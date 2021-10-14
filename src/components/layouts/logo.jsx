import React from 'react'
import IMG from '../components/img';
import logo from '../assets/images/logo/logo.png'

const Logo = () =>{
    return(
        <div className="logo">
            <IMG link={logo}></IMG>
            <h2>_ChatApp</h2>
        </div>
    );
}
export default Logo;