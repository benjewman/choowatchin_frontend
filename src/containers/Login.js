import React from 'react'
import '../NoScroll.css'
import { Header } from 'semantic-ui-react'
import pic from '../projector.jpg'
import LoginForm from '../components/LoginForm'

const sectionStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${pic})`,
    height: '100vh',
    width: '200vh'
}

class Login extends React.Component {

    render() {
        return (
                <div style={ sectionStyle } >
                    {/* <Header style={{marginTop: '0.5em', fontSize: '60px'}} as='h1' textAlign='center'>ChooWatchin</Header> */}
                    <LoginForm />
                </div>
        )
    }
}

export default Login