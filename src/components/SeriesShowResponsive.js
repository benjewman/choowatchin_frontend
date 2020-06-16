import React from 'react';
import MediaQuery from 'react-responsive';
import SeriesShow from './SeriesShow';
import SeriesShowMobile from './SeriesShowMobile';

const SeriesShowResponsive = () => {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={1224}>
                <SeriesShow />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
                <SeriesShowMobile/>
            </MediaQuery>
        </React.Fragment>
    )
}

export default SeriesShowResponsive;
