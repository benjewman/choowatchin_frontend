import React from 'react'
import { Button, Divider, Form, Grid, Segment, Container, Header } from 'semantic-ui-react'

const SignupForm = () => (
// Container gives box some room on sides and top
  <Container style={{width: 600, marginTop: '6em'}}>
    <Segment placeholder>
        <Grid style={{height: 500}} relaxed='very' stackable>
        <Grid.Row >
            <Grid.Column>
            <Form>
            <Form.Group style={{marginTop: '3em'}} widths='equal'>
            <Form.Input
                icon='id card'
                iconPosition='left'
                placeholder='Full Name'
            />
            <Form.Input
                icon='mail'
                iconPosition='left'
                type='password'
                placeholder='Email'
            />
            </Form.Group>
            <Form.Group style={{marginTop: '3em'}} widths='equal'>
            <Form.Input
                icon='user'
                iconPosition='left'
                placeholder='Username'
            />
            <Form.Input
                icon='lock'
                iconPosition='left'
                type='password'
                placeholder='Password'
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
            <Button content='Login' size='big' />
            </Grid.Column>
        </Grid.Row>
        </Grid>
    </Segment>
  </Container>
)

export default SignupForm