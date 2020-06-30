import React from 'react';
import MediaQuery from 'react-responsive';
import Profile from './Profile';
import ProfileMobile from './ProfileMobile'

function ProfileResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={750}>
                <Profile />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={749}>
                {/* <FriendsMobile /> */}
                <ProfileMobile />
            </MediaQuery>
        </React.Fragment>
    )
}

export default ProfileResponsive;