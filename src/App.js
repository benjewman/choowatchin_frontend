import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './containers/Login'
import Navbar from './components/Navbar'
import Signup from './containers/Signup'
import Dashboard from './containers/Dashboard'
import { Grid } from 'semantic-ui-react'
import './App.css'
import ScrollLock, { TouchScrollable } from 'react-scrolllock';

function App() {
  
  return (
    <BrowserRouter>
      <Grid>
        <Grid.Row style={{ marginBottom: '5em'}}>
          <Navbar />
        </Grid.Row>
        <Grid.Row >
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/home' component={Dashboard} />
          </Switch>
        </Grid.Row>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
