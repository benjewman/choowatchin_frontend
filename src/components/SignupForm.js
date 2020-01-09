import React from 'react'
import { Button, Divider, Form, Grid, Segment, Container, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../actions/index'

class SignupForm extends React.Component {
    constructor() {
        super()
        this.state = {
            full_name: '',
            email: '',
            username: '',
            password: ''
        }
    }
    
    routeToLogin = () => {
        this.props.history.push('/login')
    }

    handleFetch = data => {
        if (data.error) {
            alert('Unable to create user. Please try again.')
        } else {
            localStorage.setItem('token', data.token)
            this.props.setUser(data.user)
            this.props.history.push('/home')
        }

    }

    createUserFetch = () => {
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }

        fetch('http://localhost:3000/users', reqObj)
        .then(resp => resp.json())
        .then(data => this.handleFetch(data))

        // redirect to homepage 

        // this.setState({
        //     fullName: '',
        //     email: '',
        //     username: '',
        //     password: ''
        // })
    }

    handleIputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.createUserFetch()
    }

    render() {
        return (
            // Container gives box some room on sides and top
            <Container style={{width: 600, marginTop: '6em'}}>
                <Segment placeholder>
                    <Grid style={{height: 500}} relaxed='very' stackable>
                    <Grid.Row >
                        <Grid.Column>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group style={{marginTop: '3em'}} widths='equal'>
                        <Form.Input
                            onChange={this.handleIputChange}
                            icon='id card'
                            iconPosition='left'
                            placeholder='Full Name'
                            name='full_name'
                            value={this.state.full_name}
                        />
                        <Form.Input
                            onChange={this.handleIputChange}
                            icon='mail'
                            iconPosition='left'
                            placeholder='Email'
                            name='email'
                            value={this.state.email}
                        />
                        </Form.Group>
                        <Form.Group style={{marginTop: '3em'}} widths='equal'>
                        <Form.Input
                            onChange={this.handleIputChange}
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            name='username'
                            value={this.state.username}
                        />
                        <Form.Input
                            onChange={this.handleIputChange}
                            icon='lock'
                            iconPosition='left'
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={this.state.password}
                        />
                        </Form.Group>
                        <Button style={{marginTop: '4em'}} content='Create Account' primary />
                        </Form>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider ></Divider>
                    <Grid.Row >
                        <Grid.Column>
                        <Header textAlign="center" as='h3'>Already have an account?</Header>
                        <Button onClick={this.routeToLogin} content='Login' size='big' />
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(SignupForm))