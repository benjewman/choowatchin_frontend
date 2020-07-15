import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { withRouter } from 'react-router-dom';
import { setUser, setSearch } from '../actions/index';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

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
                <MediaQuery minDeviceWidth={768}><Icon name='sign in' size="huge" inverted color='grey'/></MediaQuery>
                <MediaQuery maxDeviceWidth={767}><Icon name='sign in' inverted color='grey'/></MediaQuery>
                </Menu.Item>
                
                <Menu.Item
                className="navMobileIcon semanticOverride"
                onClick={() => this.routeToPage(`/search`)}
                name='search'
                >
                    <MediaQuery minDeviceWidth={768}><Icon name='search' size="huge" inverted color='grey'/></MediaQuery>
                    <MediaQuery maxDeviceWidth={767}><Icon name='search' inverted color='grey'/></MediaQuery>
                    
                    {/* <Popup
                    trigger={
                        <React.Fragment>
                        <MediaQuery minDeviceWidth={768}><Icon name='search' size="huge" inverted color='grey'/></MediaQuery>
                        <MediaQuery maxDeviceWidth={767}><Icon name='search' inverted color='grey'/></MediaQuery>
                        </React.Fragment>
                    }
                    position='bottom left'
                    content="wassup"
                    >
                        <Form onSubmit={this.handleSearchSubmit}>
                            <Form.Input onChange={this.handleSearchChange} value={this.state.search} size="big" icon='search' placeholder='Search...' />
                        </Form>
                    </Popup> */}
                </Menu.Item>
            </React.Fragment>
        )
    }

    userRender = () => {
        return (
            <React.Fragment>
                <Menu.Item
                className="navMobileIcon semanticOverride"
                onClick={() => this.routeToPage(`/profile/${this.props.user.id}`)}
                name='myProfile'
                >
                <MediaQuery minDeviceWidth={768}><Icon name='user circle' size="huge" inverted color='grey'/></MediaQuery>
                <MediaQuery maxDeviceWidth={767}><Icon name='user circle' inverted color='grey'/></MediaQuery>
                </Menu.Item>

                
                <Menu.Item
                className="navMobileIcon semanticOverride"
                onClick={this.handleLogout}
                name='logout'
                >
                <MediaQuery minDeviceWidth={768}><Icon name='sign-out' size="huge" inverted color='grey'/></MediaQuery>
                <MediaQuery maxDeviceWidth={767}><Icon name='sign-out' inverted color='grey'/></MediaQuery>
                </Menu.Item>

                <Menu.Item
                className="navMobileIcon semanticOverride"
                onClick={() => this.routeToPage(`/search`)}
                name='search'
                >
                    <MediaQuery minDeviceWidth={768}><Icon name='search' size="huge" inverted color='grey'/></MediaQuery>
                    <MediaQuery maxDeviceWidth={767}><Icon name='search' inverted color='grey'/></MediaQuery>
                
                    
                    {/* <Popup
                    trigger={
                        <React.Fragment>
                        <MediaQuery minDeviceWidth={768}><Icon name='search' size="huge" inverted color='grey'/></MediaQuery>
                        <MediaQuery maxDeviceWidth={767}><Icon name='search' inverted color='grey'/></MediaQuery>
                        </React.Fragment>
                        }
                    position="bottom left"
                    content="wassup"
                    on='click'
                    >
                        <Form onSubmit={this.handleSearchSubmit}>
                            <Form.Input onChange={this.handleSearchChange} value={this.state.search} size="big" icon='search' placeholder='Search...' />
                        </Form>
                    </Popup> */}
                </Menu.Item>
            </React.Fragment>
        )
    }


    // Fix sizing for regular iPad
    
    render() {
        return (
            <Menu style={{backgroundColor: 'red', height: '10vh'}} fixed="top">
                <Menu.Item
                onClick={() => this.routeToPage('/home')}
                name='home'
                style={{fontSize: '2vw', color: 'white'}}
                >
                ChooWatchin
                </Menu.Item>
        
                <Menu.Item
                className="navMobileIcon semanticOverride"
                onClick={() => this.routeToPage('/movies')}
                name='movies'
                >
                <MediaQuery minDeviceWidth={768}><Icon name='film' size="huge" inverted color='grey'/></MediaQuery>
                <MediaQuery maxDeviceWidth={767}><Icon name='film' inverted color='grey'/></MediaQuery>
                </Menu.Item>
    
                <Menu.Item
                className="navMobileIcon semanticOverride"
                onClick={() => this.routeToPage('/series')}
                name='shows'
                >
                <MediaQuery minDeviceWidth={768}><Icon name='tv' size="huge" inverted color='grey'/></MediaQuery>
                <MediaQuery maxDeviceWidth={767}><Icon name='tv' inverted color='grey'/></MediaQuery>
                </Menu.Item>
    
                <Menu.Item
                className="navMobileIcon semanticOverride"
                onClick={() => this.routeToPage('/friends')}
                name='friends'
                >
                <MediaQuery minDeviceWidth={768}><Icon name='user' size="huge" inverted color='grey'/></MediaQuery>
                <MediaQuery maxDeviceWidth={767}><Icon name='user' inverted color='grey'/></MediaQuery>
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