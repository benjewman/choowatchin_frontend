import React from 'react'
import { Button, Divider, Form, Grid, Segment, Container } from 'semantic-ui-react'

const LoginForm = () => (
// Container gives box some room on sides and top
  <Container style={{width: 500, marginTop: '6em'}}>
  <Segment placeholder>
    <Grid style={{height: 330}} columns={2} relaxed='very' stackable>
      <Grid.Column verticalAlign='middle'>
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

          <Button content='Login' primary />
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button content='Sign up' icon='signup' size='big' />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
  </Container>
)

export default LoginForm