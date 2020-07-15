import React from 'react'
import LoginFormMobile from '../components/LoginFormMobile'
import WithAuth from '../components/WithAuth'

const sectionStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundColor: 'black',
    height: '100vh',
    width: '150vw'
}

class LoginMobile extends React.Component {

    render() {
        return (
                <div style={ sectionStyle } >
                    <LoginFormMobile />
                </div>
        )
    }
}

export default WithAuth(LoginMobile)