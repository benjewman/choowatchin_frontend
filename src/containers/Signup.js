import React from 'react'
import pic from '../theater.jpg'
import SignupForm from '../components/SignupForm'
const sectionStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${pic})`,
    height: '90vh',
    width: '200vh'
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

export default Signup