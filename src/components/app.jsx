import React, { useEffect } from 'react'
import { Fragment } from 'react/cjs/react.production.min';
import './assets/style/dashboard.css';
import Sidebar from './layouts/sidebar';
import './assets/style/layout.scss';
import ChatHistory from './layouts/chat';
import WelcomeChat from './layouts/welcomeChat';
import './assets/style/chat.css';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import AddContect from './components/addContect';

const App = ()=>{
    useEffect(() => {
        return () => {
            ReactTooltip.hide()
        }
    }, [])

    const auth = useSelector((state)=> state);
    const {token} = auth.authReducer.auth
    console.log(token)
    return(
        <Fragment>
            <div className="dashboard" onLoad={() => ReactTooltip.rebuild()}>
                <div className="box">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="welcome">
                        <Route path="/chat/addContect"  component={AddContect}/>
                        <Route path="/chat/chat/:id"  exact  component={ChatHistory}/>
                        <Route path="/chat" exact component={WelcomeChat}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;