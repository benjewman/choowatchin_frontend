import React from 'react'
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { withRouter } from 'react-router-dom'

const NavLogin = (props) => {
    const routeToSignup = () => {
        props.history.push('/signup')
    }
    
    return (
        <Menu fixed="top">
            <Menu.Item
            name='home'
            >
            ChooWatchin
            </Menu.Item>
    
            <Menu.Item
            onClick={routeToSignup}
            name='signup'
            >
            Signup
            </Menu.Item>
        </Menu>
    )
}

export default withRouter(NavLogin)