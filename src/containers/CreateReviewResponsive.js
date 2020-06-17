import React from 'react';
import MediaQuery from 'react-responsive';
import CreateReview from './CreateReview';
// import CreateReviewMobile from './CreateReviewMobile';

const CreateReviewResponsive = () => {
    return (
        <React.Fragment>
            <MediaQuery minDeviceWidth={1224}>
                <CreateReview />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
                {/* <SeriesShowMobile/> */}
            </MediaQuery>
        </React.Fragment>
    )
}

export default CreateReviewResponsive;