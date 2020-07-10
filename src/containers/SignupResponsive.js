import React from 'react';
import MediaQuery from 'react-responsive';
import Signup from './Signup';

function SignupResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={750}>
                <Signup />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={749}>
                {/* <LoginMobile /> */}
                <h1>Signup Mobile</h1>
            </MediaQuery>
        </React.Fragment>
    )
}

export default SignupResponsive;