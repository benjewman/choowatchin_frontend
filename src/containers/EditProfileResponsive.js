import React from 'react';
import MediaQuery from 'react-responsive';
import EditProfile from './EditProfile';
// import DashMobile from './DashMobile';

function EditProfileResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={750}>
                <EditProfile />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={749}>
                {/* <DashMobile /> */}
                <h1>Edit Mobile</h1>
                <h1>Edit Mobile</h1>
            </MediaQuery>
        </React.Fragment>
    )
}

export default EditProfileResponsive;