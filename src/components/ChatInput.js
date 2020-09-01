import React, {useState} from 'react';
import '../css/ChatInput.css';
import Button from "@material-ui/core/Button";
import {useStateValue} from "../provider/StateProvider";
import db from '../provider/firebaseConfig';
// import firebase from "firebase";
import firebase from "firebase/app";

function ChatInput({channelName, channelId}) {

    const [state] = useStateValue();
    const [input, setInput] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        if (channelId){
            db.collection('channel')
                .doc(channelId)
                .collection('chat')
                .add({
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: state.user.displayName,
                    userImage: state.user.photoURL
                })
                .then(r => {
                    setInput("");
                })
                .catch(e => console.log("Error - Add ", e.message));
        }
    };

    return (
        <div className="chatInput">
            <form>
                <input value={input}
                       onChange={e => setInput(e.target.value)}
                       placeholder={`Message in #${channelName}`}/>
                <button type="submit" onClick={sendMessage}>Send</button>
            </form>
        </div>
    );
}

export default ChatInput;