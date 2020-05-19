import React from 'react';
import MediaQuery from 'react-responsive';
import Dashboard from './Dashboard';

function DashResponsive() {
    return (
        <MediaQuery minDeviceWidth={1224}>
            <Dashboard />
        </MediaQuery>

        <MediaQuery maxDeviceWidth={1224}>
            
        </MediaQuery>
    )
}

export default DashResponsive;