import React, {useEffect, useState} from 'react';
import '../css/Chat.css';
import {useParams} from "react-router-dom";
import {InfoOutlined, StarBorderOutlined} from "@material-ui/icons";
import db from '../provider/firebaseConfig';
import Message from "./Message";
import ChatInput from "./ChatInput";

function Chat() {
    const {channelId} = useParams();
    const [channelInfo, setChannelInfo] = useState(null);
    const [channelMsg, setChannelMsg] = useState([]);

    useEffect(() => {
        if (channelId) {
            db.collection('channel')
                .doc(channelId)
                .onSnapshot(snapshot => setChannelInfo(snapshot.data()));

            db.collection('channel')
                .doc(channelId)
                .collection('chat')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => setChannelMsg(snapshot.docs.map(doc => doc.data())));
        }
    }, [channelId]);

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__headerLeft">
                    <div className="chat__channelName">
                        <strong># {channelInfo?.name}</strong>
                        <StarBorderOutlined/>
                    </div>
                </div>
                <div className="chat__headerRight">
                    <p>
                        <InfoOutlined/>
                    </p>
                </div>
            </div>
            <div className="chat__messages">
                {/*Messages*/}
                {channelMsg.map((msg, index) =>
                    <Message key={index}
                             message={msg.message}
                             timestamp={msg.timestamp}
                             user={msg.user}
                             userImg={msg.userImage}/>
                )}
            </div>
            <ChatInput channelName={channelInfo?.name} channelId={channelId}/>
        </div>
    );
}

export default Chat;