import React from 'react'
import { Grid, Input, Select, Button } from 'semantic-ui-react'
import WithAuth from '../components/WithAuth'
import { connect } from 'react-redux'
import UserCard from '../components/UserCard'

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
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => this.setState({users: users}))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            fetch('http://localhost:3000/users/' + this.props.user.id)
            .then(resp => resp.json())
            .then(user => this.setState({friends: user.leaders}))
        }
    }
    
    handleSearchSubmit = () => {
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
        return (
                <Input value={this.state.filter} onChange={this.handleInputChange} type='text' placeholder='Search...' action>
                    <input />
                    <Select compact onChange={this.handleSelectChange} options={options} defaultValue='your friends' />
                    <Button onClick={this.handleSearchSubmit} type='submit'>Search</Button>
                </Input>
        )
    }

    renderUsers = () => {
        return (
            <Grid columns={4}>

            </Grid>
        )
    }

    renderPeople = (type) => {
        const filteredUsers = this.state[type].filter(user => user.full_name.toLowerCase().includes(this.state.filter.toLowerCase()))
        return (
            <Grid celled='internally' style={{marginTop: '2em'}} columns={4}>
                {/* {this.state[type].map(person => <UserCard user={person} />)} */}
                {filteredUsers.map(person => <UserCard user={person} />)}
            </Grid>
        )
    }
    
    render() {
        console.log(this.state)
        return (
            <Grid.Column style={{textAlign: 'center', marginTop: '2em'}}>
                {this.renderSearchBar()}
                {this.state.filterJustFriends ? this.renderPeople('friends') : this.renderPeople('users')}
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
