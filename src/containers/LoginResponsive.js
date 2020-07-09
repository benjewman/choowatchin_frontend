import React from 'react';
import MediaQuery from 'react-responsive';
import Login from './Login';
// import FriendsMobile from './FriendsMobile'

function LoginResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={750}>
                <Login />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={749}>
                {/* <FriendsMobile /> */}
                <h1>Login Mobile</h1>
            </MediaQuery>
        </React.Fragment>
    )
}

export default LoginResponsive;