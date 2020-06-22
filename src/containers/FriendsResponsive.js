import React from 'react';
import MediaQuery from 'react-responsive';
import Friends from './Friends';
import FriendsMobile from './FriendsMobile'

function FriendsResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={1224}>
                <Friends />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
                <FriendsMobile />
            </MediaQuery>
        </React.Fragment>
    )
}

export default FriendsResponsive;