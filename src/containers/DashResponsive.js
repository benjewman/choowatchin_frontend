import React from 'react';
import MediaQuery from 'react-responsive';
import Dashboard from './Dashboard';
import DashMobile from './DashMobile';

function DashResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={1224}>
                <Dashboard />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
                <DashMobile />
            </MediaQuery>
        </React.Fragment>
    )
}

export default DashResponsive;