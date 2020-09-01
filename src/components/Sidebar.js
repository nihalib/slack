import React, {useEffect, useState} from 'react';
import '../css/Sidebar.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import SidebarOption from "./SidebarOption";
import {
    Add, AlternateEmailOutlined, Apps, ArrowUpwardOutlined,
    BookmarkBorder, DraftsOutlined, ExpandMore,
    FileCopyOutlined, InsertCommentRounded, PeopleAltOutlined
} from "@material-ui/icons";
import db from "../provider/firebaseConfig";
import {useStateValue} from "../provider/StateProvider";

function Sidebar() {
    const [state] = useStateValue();
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channel')
            .onSnapshot(snapshot => setChannels(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name
                }))
            ));
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>Project Bluemoon</h2>
                    <h3>
                        <FiberManualRecordIcon/>
                        {state.user?.displayName}
                    </h3>
                </div>
                <CreateIcon/>
            </div>
            <SidebarOption Icon={InsertCommentRounded} title="Threads"/>
            <SidebarOption Icon={AlternateEmailOutlined} title="Mentions & reaction"/>
            <SidebarOption Icon={DraftsOutlined} title="Drafts"/>
            <SidebarOption Icon={BookmarkBorder} title="Saved items"/>
            <SidebarOption Icon={PeopleAltOutlined} title="People & user groups"/>
            <SidebarOption Icon={Apps} title="Apps"/>
            <SidebarOption Icon={FileCopyOutlined} title="File browser"/>
            <SidebarOption Icon={ArrowUpwardOutlined} title="Show less"/>
            <hr/>
            <SidebarOption Icon={ExpandMore} title="Channels"/>
            <hr/>
            <SidebarOption Icon={Add} addChannelOption title="Add Channel"/>
            {channels.map(channel => <SidebarOption key={channel.id} title={channel.name} id={channel.id}/>)}
        </div>
    );
}

export default Sidebar;