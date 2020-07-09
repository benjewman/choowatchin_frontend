import React from 'react';
import { Button, Divider, Form, Grid, Segment, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../actions/index';
import { url } from '../urls.js';

class LoginFormMobile extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }
    
    routeToSignup = () => {
        this.props.history.push('/signup')
    }

    createLoginObj = () => {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }
    }

    setUserAndRedirect = (data) => {
        this.props.setUser(data.user)
        localStorage.setItem('token', data.token)
        
        // push to homepage when homepage is set up
        this.props.history.push('/home')
    }

    handleLogin = () => {
        // POST fetch request to create token 
        //for authenticated user
        const reqObj = this.createLoginObj()
        

        fetch(`${url}/auth`, reqObj)
        .then(resp => resp.json())
        .then(data => data.error ? alert('invalid credentials') : this.setUserAndRedirect(data))

        // set store with logged in user
        // 
        // redirect to user's homepage
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.handleLogin()
    }
    
    render() {
        return(
            // Container gives box some room on sides and top
            <Container style={{marginTop: '10vh'}}>
            <Segment style={{marginRight: 'auto', marginLeft: 'auto'}} placeholder>
                <Grid relaxed='very' stackable>
                <Grid.Row>
                    <Form onSubmit={this.handleSubmit} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '3vh'}}>
                    <Form.Input
                        onChange={this.handleInputChange}
                        icon='user'
                        iconPosition='left'
                        placeholder='Username'
                        name="username"
                        value={this.state.username}
                    />
                    <Form.Input
                        onChange={this.handleInputChange}
                        icon='lock'
                        iconPosition='left'
                        type='password'
                        placeholder='Password'
                        name="password"
                        value={this.state.password}
                    />

                    <Button style={{marginTop: '3vh', marginBottom: '2vh'}} content='Login' primary />
                    </Form>
                </Grid.Row>

                <Divider vertical>Or</Divider>

                <Grid.Row>
                    <Button style={{marginBottom: '3vh', marginTop: '2vh'}} onClick={this.routeToSignup} content='Sign up' icon='signup' size='big' />
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

export default connect(null, mapDispatchToProps)(withRouter(LoginFormMobile))