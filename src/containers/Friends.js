import React from 'react'
import { Grid, Input, Select } from 'semantic-ui-react'
import WithAuth from '../components/WithAuth'
import { connect } from 'react-redux'
import UserCard from '../components/UserCard'
import { url } from '../urls.js'

class Friends extends React.Component {
    constructor() {
        super()
        this.state = {
            // toggle this when selection changes
            filterJustFriends: true,
            filter: '',
            friends: [],
            users: []
        }
    }

    componentDidMount() {
        // refactor because this isn't the best
        // way to access this data
        // especially if there were a lot of users
        fetch(`${url}/users`)
        .then(resp => resp.json())
        .then(users => this.setState({users: users}))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            fetch(`${url}/users/` + this.props.user.id)
            .then(resp => resp.json())
            .then(user => this.setState({friends: user.leaders}))
        }
    }
    
    handleSelectChange = () => {
        this.setState({filterJustFriends: !this.state.filterJustFriends})
    }

    handleInputChange = (event) => {
        this.setState({filter: event.target.value})
    }
    
    renderSearchBar = () => {
        const options = [
            { key: 'your friends', text: 'Your Friends', value: 'your friends' },
            { key: 'everyone', text: 'Everyone', value: 'everyone' },
        ]
        const renderSelect = () => {
            return (
                <Select compact onChange={this.handleSelectChange} options={options} defaultValue='your friends' />

            )
        }
        const renderCount = () => {
            if (this.props.user) {
                if (this.state.filterJustFriends) {
                    return (
                        <p>{this.state.friends.length} Friends</p>
                    )
                } else {
                    return (
                        <p>{this.state.users.length - 1} Total Users</p>
                    )
                }
            } else {
                return (
                    <p>{this.state.users.length} Total Users</p>
                )
            }
        }
        
        return (
            <div>
                <Input value={this.state.filter} onChange={this.handleInputChange} type='text' placeholder='Search...' action />
                {this.props.user ? renderSelect() : null}
                {/* pluralize friends/users below to fix grammar */}
                {renderCount()}
            </div>
        )
    }

    addFriend = (friend) => {
        this.setState({friends: [...this.state.friends, friend]})
    }

    removeFriend = (friend_id) => {
        const updatedFriends = this.state.friends.filter(friend => friend.id !== friend_id)
        this.setState({friends: updatedFriends})
    }
    
    renderPeople = (type) => {
        // console.log(this.state[type])

        const filteredUsers = this.state[type].filter(user => user.id !== this.props.user.id &&  user.full_name.toLowerCase().includes(this.state.filter.toLowerCase()))
        console.log('FILTERED USERS', filteredUsers);
        return (
            <Grid celled='internally' style={{marginTop: '3vh'}} columns={6}>
                {filteredUsers.map(friend => <UserCard removeFriend={this.removeFriend} addFriend={this.addFriend} friend={friend} />)}
            </Grid>
        )
    }

    renderUserOptions = () => {
        if (this.state.filterJustFriends) {
            return this.renderPeople('friends');
        }  else {
            return this.renderPeople('users');
        }
    }

    renderAll = () => {
        const filteredUsers = this.state['users'].filter(user => user.full_name.toLowerCase().includes(this.state.filter.toLowerCase()))
        return (
            <Grid celled='internally' style={{marginTop: '3vh'}} columns={6}>
                {filteredUsers.map(friend => <UserCard removeFriend={this.removeFriend} addFriend={this.addFriend} friend={friend} />)}
            </Grid>
        )
    }
    
    render() {
        return (
            <Grid.Column style={{textAlign: 'center', marginTop: '4vh'}}>
                {this.renderSearchBar()}
                {this.props.user ? this.renderUserOptions() : this.renderAll()}
            </Grid.Column> 
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(WithAuth(Friends))
