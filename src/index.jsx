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
import store from './redux/store/configurationStore';
import { Provider } from 'react-redux'
import ReactTooltip from 'react-tooltip';

import App from './components/app';
import Welcome from './welcome';
import PrivateRoute from './routes/protectedRoutes';


const Root = () =>{
    
    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route path='/home' component={Welcome}/>
                    <PrivateRoute path="/chat" component={App}/>
                    <Redirect from="/" to="/home"/>                
                </Switch>
            </Router>
        </Fragment>
    );
}


reactDom.render(
    <Provider store={store}>
        <ReactTooltip />
        <ToastContainer />
        <Root/>
    </Provider>,
    document.getElementById('root')
)