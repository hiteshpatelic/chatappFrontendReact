import React from 'react'
import reactDom from 'react-dom';
import { Fragment } from 'react/cjs/react.production.min';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect 
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';


import App from './components/app';
import Welcome from './welcome';

const Root = () =>{
    
    return (
        <Fragment>
            <ToastContainer />
            <Router>
                <Switch>
                    <Route path="/chat" component={App} />
                    <Route path='/home' component={Welcome}/>
                    <Redirect from="/" to="/home"/>                
                </Switch>
            </Router>
        </Fragment>
    );
}

reactDom.render(
    <Root/>,
    document.getElementById('root')
)