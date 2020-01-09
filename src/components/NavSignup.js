import React from 'react'
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { withRouter } from 'react-router-dom'

const NavSignup = (props) => {
    const routeToLogin = () => {
        props.history.push('/login')
    }
    
    return (
        <Menu fixed="top">
            <Menu.Item
            name='home'
            style={{ fontSize: '30px'}}
            >
            ChooWatchin
            </Menu.Item>
    
            <Menu.Item
            onClick={routeToLogin}
            name='reviews'
            style={{ fontSize: '22px'}}
            >
            Login
            </Menu.Item>
        </Menu>
    )
}

export default withRouter(NavSignup)