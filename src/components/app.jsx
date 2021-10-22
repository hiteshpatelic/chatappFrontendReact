import React, { useEffect } from 'react'
import { Fragment } from 'react/cjs/react.production.min';
import './assets/style/dashboard.css';
import Sidebar from './layouts/sidebar';
import './assets/style/layout.scss';
import ChatHistory from './layouts/chat';
import WelcomeChat from './layouts/welcomeChat';
import './assets/style/chat.css';
import { Route, Redirect } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import AddContect from './components/addContect';
import { useSelector } from 'react-redux';

const App = ()=>{
    useEffect(() => {
        return () => {
            ReactTooltip.hide()
        }
    }, [])

    const profile = useSelector(state => state.profileReducer.profile)
    return(
        <Fragment>
            <div className="dashboard" onLoad={() => ReactTooltip.rebuild()}>
                <div className="box">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="welcome">
                        <Route path="/chat/addContect"  component={AddContect}/>
                        <Route path="/chat/user/:id"  exact  component={ChatHistory}/>

                        <Route path="/chat" exact component={()=><WelcomeChat name={profile.username} img={profile.profilePicture}/>}/>
                        <Redirect from ="/chat/" to="/chat"/>   
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;