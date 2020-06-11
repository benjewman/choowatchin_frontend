import React from 'react';
import MediaQuery from 'react-responsive';
import MovieShow from './MovieShow';
import MovieShowMobile from './MovieShowMobile';

const MovieShowResponsive = () => {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={1224}>
                <MovieShow />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
                <MovieShowMobile/>
            </MediaQuery>
        </React.Fragment>
    )
}

export default MovieShowResponsive;