import React from 'react';
import MediaQuery from 'react-responsive';
import SearchPage from './SearchPage';
import SearchPageMobile from './SearchPageMobile';

function SearchPageResponsive() {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={1224}>
                <SearchPage />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
                <SearchPageMobile />
            </MediaQuery>
        </React.Fragment>
    )
}

export default SearchPageResponsive;