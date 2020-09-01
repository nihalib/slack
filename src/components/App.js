import React, {useEffect, useState} from 'react';
import '../css/App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import {useStateValue} from "../provider/StateProvider";
import {auth} from "../provider/firebaseConfig";
import {actionTypes} from "../provider/Reducer";

function App() {

    const [state, dispatch] = useStateValue();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            user?
                dispatch({
                    type: actionTypes.SET_USER,
                    user: user
                }) :
                dispatch({
                    type: actionTypes.SET_USER,
                    user: null
                })
        })
    }, []);

    return (
        //BEM Naming Conventions
        <div className="app">
            <Router>
                {!state.user ?
                    <Login/> :
                    <>
                        <Header/>
                        <div className="app__body">
                            <Sidebar/>
                            <Switch>
                                <Route path="/channel/:channelId">
                                    <Chat/>
                                </Route>
                                <Route path="/">
                                    <h1>Welcome</h1>
                                </Route>
                            </Switch>
                        </div>
                    </>
                }
            </Router>
        </div>
    );
}

export default App;
