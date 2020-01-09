import React from 'react'
import { Menu, Input } from 'semantic-ui-react'
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
            style={{ fontSize: '30px'}}
            >
            ChooWatchin
            </Menu.Item>
    
            <Menu.Item
            name='movies'
            style={{ fontSize: '20px'}}
            >
            Movies
            </Menu.Item>

            <Menu.Item
            name='shows'
            style={{ fontSize: '20px'}}
            >
            Shows
            </Menu.Item>

            <Menu.Item
            name='friends'
            style={{ fontSize: '20px'}}
            >
            Friends
            </Menu.Item>

            <Menu.Item
            name='myProfile'
            style={{ fontSize: '20px'}}
            >
            My Profile
            </Menu.Item>

            <Menu.Item
            name='createReview'
            style={{ fontSize: '20px'}}
            >
            Create Review
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item
                onClick={handleLogout}
                name='logout'
                style={{ fontSize: '20px'}}
                >
                Logout
                </Menu.Item>

                <Menu.Item>
                    <Input size="big" icon='search' placeholder='Search...' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        quitUser: () => dispatch(setUser(undefined))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(NavDefault))