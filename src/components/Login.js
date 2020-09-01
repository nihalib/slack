import React from 'react';
import '../css/Login.css';
import Button from "@material-ui/core/Button";
import {auth, provider, persistence} from "../provider/firebaseConfig";
import {useStateValue} from "../provider/StateProvider";
import {actionTypes} from "../provider/Reducer";

function Login() {

    const [state, dispatch] = useStateValue();

    const signIn = () => {
        auth.setPersistence(persistence)
            .then(() => {
                auth.signInWithPopup(provider)
                    .then(result => {
                        dispatch({
                            type: actionTypes.SET_USER,
                            user: result.user
                        });
                    })
                    .catch(error => console.log("SignIn error with provider: ", error.message))
            })
            .catch( error => console.log("SignIn persistence error: ", error.message))
    };

    return (
        <div className="login">
            <div className="login__container">
                <img alt="Slack logo"
                     src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/2019-01_BrandRefresh_Old-to-New-Final.gif"/>
                <h1>Sign in to Project Bluemoon</h1>
                <p>bluemoonllc.slack.com</p>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    );
}

export default Login;