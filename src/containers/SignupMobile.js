import React from 'react';
import pic from '../theater.jpg';
import SignupFormMobile from '../components/SignupFormMobile';

// Need to adjust the style 
const sectionStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundColor: 'black',
    height: '100vh',
    width: '150vw'
}


class SignupMobile extends React.Component {
    render() {
        return (
            <div style={ sectionStyle } >
                <SignupFormMobile />
            </div>
        )
    }
}

export default SignupMobile;