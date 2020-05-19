import React from 'react';
import MediaQuery from 'react-responsive';
import Dashboard from './Dashboard';

function DashResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={1224}>
                <Dashboard />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
                <h1>Mobile version not ready</h1>
            </MediaQuery>
        </React.Fragment>
    )
}

export default DashResponsive;