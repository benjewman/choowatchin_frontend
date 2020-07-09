import React from 'react';
import MediaQuery from 'react-responsive';
import Login from './Login';
import LoginMobile from './LoginMobile';

function LoginResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={750}>
                <Login />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={749}>
                <LoginMobile />
            </MediaQuery>
        </React.Fragment>
    )
}

export default LoginResponsive;