import React from 'react';
import '../css/SidebarOption.css';
import { useHistory } from "react-router-dom";
import db from '../provider/firebaseConfig';

function SidebarOption({Icon, title, id, addChannelOption}) {

    let history = useHistory();

    const addChannel = (e) => {
        e.preventDefault();
        const channelName = prompt("Enter the channel name");
        if (channelName) {
            db.collection('channel').add({
                name: channelName
            })
        }
    };

    const selectChannel = (e) => {
        e.preventDefault();
        if(id) {
            history.push(`/channel/${id}`);
        } else {
            history.push(title);
        }
    };

    return (
        <div className="sidebarOption" onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon && <Icon className="sidebarOption_icon" />}
            {Icon ?
                <h3>{title}</h3> :
                <h3 className="sidebarOption_channel">
                    <span className="sidebarOption_hash">#</span>
                    {title}
                </h3>}
        </div>
    );
}

export default SidebarOption;