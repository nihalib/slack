import React from 'react';
import '../css/Header.css';
import {Avatar} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {useStateValue} from "../provider/StateProvider";

function Header() {
    const [state] = useStateValue();

    return (
        <div className="header">
            <div className="header__left">
                {/*Avatar for logged in user*/}
                <Avatar className="header__avatar"
                        alt={state.user?.displayName}
                        src={state.user?.photoURL}/>
                {/*Time icon*/}
                <AccessTimeIcon/>
            </div>
            <div className="header__search">
                {/*search icon*/}
                <SearchIcon/>
                {/*search input*/}
                <input placeholder="Search Project Bluemoon"/>
            </div>
            <div className="header__right">
                {/*help icon*/}
                <HelpOutlineIcon/>
            </div>
        </div>
    );
}

export default Header;