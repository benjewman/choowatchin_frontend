import React from 'react'
import { Menu, Form, Icon, Popup } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { withRouter } from 'react-router-dom'
import { setUser, setSearch } from '../actions/index'
import { connect } from 'react-redux'

class NavMobile extends React.Component {
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

    nonUserRender = () => {
        return (
            <React.Fragment>
                <Menu.Item
                onClick={() => this.props.history.push('/login')}
                name='login'
                >
                <Icon name='sign in' inverted color='grey'/>
                </Menu.Item>
                
                <Menu.Item className='navHeaders semanticOverride'>
                    <Popup
                    trigger={<Icon name='search' inverted color='grey'/>}
                    on='click'
                    >
                        <Form onSubmit={this.handleSearchSubmit}>
                            <Form.Input onChange={this.handleSearchChange} value={this.state.search} size="big" icon='search' placeholder='Search...' />
                        </Form>
                    </Popup>
                </Menu.Item>
            </React.Fragment>
        )
    }

    userRender = () => {
        return (
            <React.Fragment>
                <Menu.Item
                onClick={() => this.routeToPage(`/profile/${this.props.user.id}`)}
                name='myProfile'
                
                >
                <Icon name="user circle" inverted color='grey'/>
                </Menu.Item>

                <Menu.Item
                onClick={this.handleLogout}
                name='logout'
                
                >
                <Icon name="sign-out" inverted color='grey'/>
                </Menu.Item>

                <Menu.Item>
                    <Popup
                    trigger={<Icon name='search' inverted color='grey'/>}
                    on='click'
                    >
                        <Form onSubmit={this.handleSearchSubmit}>
                            <Form.Input onChange={this.handleSearchChange} value={this.state.search} size="big" icon='search' placeholder='Search...' />
                        </Form>
                    </Popup>
                    
                </Menu.Item>
            </React.Fragment>
        )
    }

    render() {
        return (
            <Menu style={{backgroundColor: 'red', height: '10vh'}} fixed="top">
                <Menu.Item
                onClick={() => this.routeToPage('/home')}
                name='home'
                style={{ fontSize: '3vw', color: 'white'}}
                >
                ChooWatchin
                </Menu.Item>
        
                <Menu.Item
                onClick={() => this.routeToPage('/movies')}
                name='movies'
                >
                <Icon name='film' inverted color='grey'/>
                </Menu.Item>
    
                <Menu.Item
                onClick={() => this.routeToPage('/series')}
                name='shows'
                >
                <Icon name='tv' inverted color='grey'/>
                </Menu.Item>
    
                <Menu.Item
                onClick={() => this.routeToPage('/friends')}
                name='friends'
                >
                <Icon name='user' inverted color='grey'/>
                </Menu.Item>
    
                {this.props.user ? this.userRender() : this.nonUserRender()}

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavMobile))