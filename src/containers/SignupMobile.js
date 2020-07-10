import React from 'react';
import pic from '../theater.jpg';
import SignupForm from '../components/SignupForm';

const sectionStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${pic})`,
    height: '100vh',
    width: '100vw'
}


class Signup extends React.Component {
    render() {
        return (
            <div style={ sectionStyle } >
                <SignupForm />
            </div>
        )
    }
}

export default SignupMobile;