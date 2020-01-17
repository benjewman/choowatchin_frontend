import React from 'react'
import WithAuth from '../components/WithAuth'
import { connect } from 'react-redux'
import { Grid, Form, Image, Button } from 'semantic-ui-react'
import { setUser } from '../actions/index'

class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: ''
        }
    }
    
    componentDidUpdate() {
        if (parseInt(this.props.match.params.id) !== this.props.user.id) {
            this.props.history.push(`/profile/${this.props.match.params.id}`)
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.user !== this.props.user) {
            this.setState({
                fullName: nextProps.user.full_name,
                email: nextProps.user.email,
                pic: nextProps.user.pic
            })
        }
    }

    changeName = (event) => {
        this.setState({fullName: event.target.value})
    }

    changeEmail = (event) => {
        this.setState({email: event.target.value})
    }

    handleSubmit = () => {
        // fetch PUT for user
        // send state
        const reqBody = {
            full_name: this.state.fullName,
            email: this.state.email
        }
        
        const reqObj = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }

        fetch(`http://localhost:3000/users/${this.props.user.id}`, reqObj)
        .then(resp => resp.json())
        .then(user => this.props.setUser(user))

        this.props.history.push(`/profile/${this.props.user.id}`)
    }
    
    handleDelete = () => {
        fetch(`http://localhost:3000/users/${this.props.user.id}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => console.log(data))
        
        localStorage.removeItem('token')
        this.props.history.push('/login')
    }
    
    render() {
        return (
            <Grid columns={3}>
                <Grid.Column style={{textAlign: 'center', marginLeft: '5em', marginTop: '5em'}}>                   
                    <Image src={this.state.pic} style={{marginBottom: '2em'}}/>
                    <Button content='Change Profile Picture' />
                </Grid.Column>
                <Grid.Column style={{marginLeft: '4em'}}>
                    <h1 style={{textAlign: 'center', marginBottom: '5em'}}>Edit Profile</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Full Name</label>
                            <input onChange={this.changeName} value={this.state.fullName} placeholder={this.props.user ? this.props.user.full_name : null} />
                            <label style={{marginTop: '1em'}}>Email</label>
                            <input onChange={this.changeEmail} value={this.state.email} placeholder={this.props.user ? this.props.user.email : null} />
                        </Form.Field>
                        <Form.Button>Update Profile</Form.Button>
                    </Form>
                    <Button style={{marginTop: '1em', color: 'red'}} onClick={this.handleDelete} content='Delete User' />
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(EditProfile))