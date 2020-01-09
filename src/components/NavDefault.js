import React from 'react'
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { withRouter } from 'react-router-dom'
import { setUser } from '../actions/index'
import { connect } from 'react-redux'

const NavDefault = (props) => {
    const routeToHome = () => {
        if (props.history.location.pathname !== '/home') {
            props.history.push('/home')
        }
    }

    const handleLogout = () => {
        props.quitUser()
        localStorage.removeItem('token')
        props.history.push('/login')
    }
    
    return (
        <Menu fixed="top">
            <Menu.Item
            onClick={routeToHome}
            name='home'
            style={{ fontSize: '22px'}}
            >
            ChooWatchin
            </Menu.Item>
    
            <Menu.Item
            name='movies'
            >
            Movies
            </Menu.Item>

            <Menu.Item
            name='shows'
            >
            Shows
            </Menu.Item>

            <Menu.Item
            name='friends'
            >
            Friends
            </Menu.Item>

            <Menu.Item
            name='myProfile'
            >
            My Profile
            </Menu.Item>

            <Menu.Item
            name='createReview'
            >
            New Review
            </Menu.Item>

            <Menu.Item
            onClick={handleLogout}
            name='logout'
            >
            Logout
            </Menu.Item>
        </Menu>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        quitUser: () => dispatch(setUser(undefined))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(NavDefault))