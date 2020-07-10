import React from 'react';
import pic from '../theater.jpg';
import SignupFormMobile from '../components/SignupFormMobile';

const sectionStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${pic})`,
    height: '100vh',
    width: '100vw'
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