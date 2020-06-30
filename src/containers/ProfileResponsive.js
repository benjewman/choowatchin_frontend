import React from 'react';
import MediaQuery from 'react-responsive';
import Profile from './Profile';

function ProfileResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={1224}>
                <Profile />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
                {/* <FriendsMobile /> */}
                <h1>Profile Mobile</h1>
                <h1>Profile Mobile</h1>
                <h1>Profile Mobile</h1>
            </MediaQuery>
        </React.Fragment>
    )
}

export default ProfileResponsive;