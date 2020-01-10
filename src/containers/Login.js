import React from 'react'
import pic from '../projector.jpg'
import LoginForm from '../components/LoginForm'
// import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'

const sectionStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${pic})`,
    height: '100vh',
    width: '200vh'
}

class Login extends React.Component {
    body = document.querySelector('body')
    
 
    
     componentDidMount() {
        if (this.props.history.location.pathname === '/') {
            this.props.history.push('/login')
        }
        // this.body.classList.add('stop-scrolling')
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