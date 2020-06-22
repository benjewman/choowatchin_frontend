import React from 'react';
import MediaQuery from 'react-responsive';
import Friends from './Friends';

function FriendsResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={1224}>
                <Friends />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
                <h1>FriendsMobile</h1>
            </MediaQuery>
        </React.Fragment>
    )
}

export default FriendsResponsive;