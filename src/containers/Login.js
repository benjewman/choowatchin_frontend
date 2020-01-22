import React from 'react'
import pic from '../projector.jpg'
import LoginForm from '../components/LoginForm'
import WithAuth from '../components/WithAuth'

const sectionStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${pic})`,
    height: '90vh',
    width: '200vh'
}

class Login extends React.Component {
        
     componentDidMount() {
        if (this.props.history.location.pathname === '/') {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
                <div style={ sectionStyle } >
                    <LoginForm />
                </div>
        )
    }
}

export default WithAuth(Login)