import React from 'react'
import { Fragment } from 'react/cjs/react.production.min';
import './assets/style/dashboard.css';
import Sidebar from './layouts/sidebar';
import './assets/style/layout.scss';
import ChatHistory from './layouts/chat';
import WelcomeChat from './layouts/welcomeChat';
import './assets/style/chat.css';
import { Route } from 'react-router-dom';


const App = ()=>{

    return(
        <Fragment>
            <div className="dashboard">
                <div className="box">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="welcome">
                        <Route path="/chat/" exact   component={WelcomeChat}/>
                        <Route path="/chat/:id" exact   component={ChatHistory}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;