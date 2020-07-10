import React from 'react';
import MediaQuery from 'react-responsive';
import Signup from './Signup';
import SignupMobile from './SignupMobile';

function SignupResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={750}>
                <Signup />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={749}>
                <SignupMobile />
            </MediaQuery>
        </React.Fragment>
    )
}

export default SignupResponsive;