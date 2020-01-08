import React from 'react'
import { Button, Divider, Form, Grid, Segment, Container, Header } from 'semantic-ui-react'

const SignupForm = () => (
// Container gives box some room on sides and top
  <Container style={{width: 600, marginTop: '6em'}}>
    <Segment placeholder>
        <Grid style={{height: 600}} relaxed='very' stackable>
        <Grid.Row >
            <Grid.Column>
            <Form>
            <Form.Input
                icon='user'
                iconPosition='left'
                label='Username'
                placeholder='Username'
            />
            <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type='password'
            />

            <Button content='Create Account' primary />
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