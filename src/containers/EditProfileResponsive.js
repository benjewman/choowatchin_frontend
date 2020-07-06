import React from 'react';
import MediaQuery from 'react-responsive';
import EditProfile from './EditProfile';
import EditProfileMobile from './EditProfileMobile';
function EditProfileResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={750}>
                <EditProfile />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={749}>
                <EditProfileMobile />
            </MediaQuery>
        </React.Fragment>
    )
}

export default EditProfileResponsive;