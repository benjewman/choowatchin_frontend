import React from 'react'
import pic from '../projector.jpg'
import LoginForm from '../components/LoginForm'
import WithAuth from '../components/WithAuth'

const sectionStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${pic})`,
    height: '100vh',
    width: '100vw'
}

class LoginMobile extends React.Component {

    render() {
        return (
                <div style={ sectionStyle } >
                    <LoginForm />
                </div>
        )
    }
}

export default WithAuth(LoginMobile)