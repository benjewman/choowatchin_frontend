import React from 'react'
import { Button, Divider, Form, Grid, Segment, Container } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class LoginForm extends React.Component {
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

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(event.target)
    }
    
    render() {
        return(
            // Container gives box some room on sides and top
            <Container style={{width: 500, marginTop: '6em'}}>
            <Segment placeholder>
                <Grid style={{height: 330}} columns={2} relaxed='very' stackable>
                <Grid.Column verticalAlign='middle'>
                    <Form onSubmit={this.handleSubmit}>
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

                    <Button style={{marginTop: '3em'}} content='Login' primary />
                    </Form>
                </Grid.Column>

                <Grid.Column verticalAlign='middle'>
                    <Button onClick={this.routeToSignup} content='Sign up' icon='signup' size='big' />
                </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </Segment>
            </Container>
        )
    }
}

export default withRouter(LoginForm)