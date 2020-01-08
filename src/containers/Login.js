import React from 'react'
import '../App.css'
import { Header } from 'semantic-ui-react'
import pic from '../projector.jpg'

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
                    <Header as='h1'>ChooWatchin</Header>
                </div>
        )
    }
}

export default Login