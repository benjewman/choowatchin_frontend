import React from 'react'
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { withRouter } from 'react-router-dom'

const NavLogin = (props) => {
    const routeToSignup = () => {
        props.history.push('/signup')
    }
    
    return (
        <Menu style={{backgroundColor: '#741906'}} fixed="top">
            <Menu.Item
            name='home'
            style={{ fontSize: '30px', color: 'white'}}
            >
            ChooWatchin
            </Menu.Item>
    
            
            <Menu.Item
            onClick={routeToSignup}
            name='signup'
            style={{ fontSize: '22px', color: 'white'}}
            >
            Signup
            </Menu.Item>
        </Menu>
    )
}

export default withRouter(NavLogin)