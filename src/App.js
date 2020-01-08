import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './containers/Login'
import Navbar from './components/Navbar'
import Signup from './containers/Signup'
import { Grid } from 'semantic-ui-react'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Grid>
        <Grid.Row style={{ marginBottom: '1em'}}>
          <Navbar />
        </Grid.Row>
        <Grid.Row >
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
          </Switch>
        </Grid.Row>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
