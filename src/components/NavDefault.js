import React from 'react'
import { Menu, Input, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { withRouter } from 'react-router-dom'
import { setUser, setSearch } from '../actions/index'
import { connect } from 'react-redux'

class NavDefault extends React.Component {
    constructor() {
        super()
        this.state = {
            search: ''
        }
    }
    
    routeToPage = (path) => {
        if (this.props.history.location.pathname !== path) {
            this.props.history.push(path)
        }
    }

    handleLogout = () => {
        this.props.quitUser()
        localStorage.removeItem('token')
        this.props.history.push('/login')
    }

    handleSearchSubmit = (event) => {
        event.preventDefault()
        this.props.setSearch(this.state.search)
        this.setState({search: ''})
        this.props.history.push(`/search`)
    }

    handleSearchChange = event => {
        this.setState({search: event.target.value})
    }

    userRender = () => {
        return (
            <React.Fragment>
                <Menu.Item
                onClick={() => this.routeToPage(`/profile/${this.props.user.id}`)}
                name='myProfile'
                style={{ fontSize: '20px', color: 'white'}}
                >
                My Profile
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item
                    onClick={this.handleLogout}
                    name='logout'
                    style={{ fontSize: '20px', color: 'white'}}
                    >
                    Logout
                    </Menu.Item>

                    <Menu.Item>
                        <Form onSubmit={this.handleSearchSubmit}>
                            <Form.Input onChange={this.handleSearchChange} value={this.state.search} size="big" icon='search' placeholder='Search...' />
                        </Form>
                    </Menu.Item>
                </Menu.Menu>
            </React.Fragment>
        )
    }

    nonUserRender = () => {
        return (
            <Menu.Menu position='right'>
                <Menu.Item
                onClick={() => this.props.history.push('/login')}
                name='login'
                style={{ fontSize: '20px', color: 'white'}}
                >
                Login
                </Menu.Item>
                <Menu.Item
                onClick={() => this.props.history.push('/signup')}
                name='signup'
                style={{ fontSize: '20px', color: 'white'}}
                >
                Signup
                </Menu.Item>
                <Menu.Item>
                    <Form onSubmit={this.handleSearchSubmit}>
                        <Form.Input onChange={this.handleSearchChange} value={this.state.search} size="big" icon='search' placeholder='Search...' />
                    </Form>
                </Menu.Item>
            </Menu.Menu>
        )
    }
    
    render() {
        return (
            <Menu style={{backgroundColor: 'red'}} fixed="top">
                <Menu.Item
                onClick={() => this.routeToPage('/home')}
                name='home'
                style={{ fontSize: '30px', color: 'white'}}
                >
                ChooWatchin
                </Menu.Item>
        
                <Menu.Item
                onClick={() => this.routeToPage('/movies')}
                name='movies'
                style={{ fontSize: '20px', color: 'white'}}
                >
                Movies Now Playing
                </Menu.Item>
    
                <Menu.Item
                onClick={() => this.routeToPage('/series')}
                name='shows'
                style={{ fontSize: '20px', color: 'white'}}
                >
                TV On Air
                </Menu.Item>
    
                <Menu.Item
                onClick={() => this.routeToPage('/friends')}
                name='friends'
                style={{ fontSize: '20px', color: 'white'}}
                >
                Friends
                </Menu.Item>
    
                {this.props.user ? this.userRender() : this.nonUserRender()}


                {/* <Menu.Item
                onClick={() => this.routeToPage(`/profile/${this.props.user.id}`)}
                name='myProfile'
                style={{ fontSize: '20px', color: 'white'}}
                >
                My Profile
                </Menu.Item>
    
                <Menu.Menu position='right'>
                    <Menu.Item
                    onClick={this.handleLogout}
                    name='logout'
                    style={{ fontSize: '20px', color: 'white'}}
                    >
                    Logout
                    </Menu.Item>
    
                    <Menu.Item>
                        <Form onSubmit={this.handleSearchSubmit}>
                            <Form.Input onChange={this.handleSearchChange} value={this.state.search} size="big" icon='search' placeholder='Search...' />
                        </Form>
                    </Menu.Item>
                </Menu.Menu> */}

            </Menu>
        )
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        quitUser: () => dispatch(setUser(undefined)),
        setSearch: string => dispatch(setSearch(string))
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavDefault))