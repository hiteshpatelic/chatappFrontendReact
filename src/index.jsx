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
import { Provider, useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip';

import App from './components/app';
import Welcome from './welcome';
import PrivateRoute from './routes/protectedRoutes';
import socket from './socket/config';
import { fetchUserProfile } from './redux/actions/profile';
import Loder from './components/layouts/loder'
import { setAuthToken } from './redux/actions/auth';



const Root = () =>{
    
    socket.off('res').on("res", res=>{
        const {eventName,data} = res
        if(eventName === "getUserProfileInfo"){
          dispatch(fetchUserProfile(data))
        }
    })
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profileReducer.profile)

    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route path='/home' component={Welcome}/>
                    <PrivateRoute path="/chat" component={()=>{
                        if(profile.username){
                            return <App/>
                        }else{
                            const authtoken = localStorage.getItem('token');
                            if(authtoken) {
                                dispatch(setAuthToken(authtoken));
                                const eventdata = {
                                    eventName: "getUserProfileInfo",
                                    token: authtoken
                                } 
                                socket.emit('req', eventdata );
                                return <Loder/>
                            }
                        }
                    }}/>
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