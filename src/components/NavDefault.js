import React from 'react'
import { Menu, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { withRouter } from 'react-router-dom'
import { setUser } from '../actions/index'
import { connect } from 'react-redux'

const NavDefault = (props) => {
    const routeToPage = (path) => {
        if (props.history.location.pathname !== path) {
            props.history.push(path)
        }
    }

    const handleLogout = () => {
        props.quitUser()
        localStorage.removeItem('token')
        props.history.push('/login')
    }
    
    return (
        <Menu style={{backgroundColor: 'red'}} fixed="top">
            <Menu.Item
            onClick={() => routeToPage('/home')}
            name='home'
            style={{ fontSize: '30px', color: 'white'}}
            >
            ChooWatchin
            </Menu.Item>
    
            <Menu.Item
            onClick={() => routeToPage('/movies')}
            name='movies'
            style={{ fontSize: '20px', color: 'white'}}
            >
            In Theaters
            </Menu.Item>

            <Menu.Item
            onClick={() => routeToPage('/series')}
            name='shows'
            style={{ fontSize: '20px', color: 'white'}}
            >
            TV On Air
            </Menu.Item>

            <Menu.Item
            onClick={() => routeToPage('/friends')}
            name='friends'
            style={{ fontSize: '20px', color: 'white'}}
            >
            Friends
            </Menu.Item>

            <Menu.Item
            name='myProfile'
            style={{ fontSize: '20px', color: 'white'}}
            >
            My Profile
            </Menu.Item>

            <Menu.Item
            name='createReview'
            style={{ fontSize: '20px', color: 'white'}}
            >
            Create Review
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item
                onClick={handleLogout}
                name='logout'
                style={{ fontSize: '20px', color: 'white'}}
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