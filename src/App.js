import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Dashboard from './containers/Dashboard';
import { Grid } from 'semantic-ui-react';
import './App.css';
import InTheaters from './containers/InTheaters';
import OnAir from './containers/OnAir';
import CreateReviewResponsive from './containers/CreateReviewResponsive';
import FriendsResponsive from './containers/FriendsResponsive';
import ProfileResponsive from './containers/ProfileResponsive';
import EditProfile from './containers/EditProfile';
import SearchPageResponsive from './containers/SearchPageResponsive';
import MediaQuery from 'react-responsive';
import NavDefault from './components/NavDefault';
import DashResponsive from './containers/DashResponsive';
import NavResponsive from './components/NavResponsive';
import MovieShowResponsive from './components/MovieShowResponsive';
import SeriesShowResponsive from './components/SeriesShowResponsive';

function App() {
  return (
      <BrowserRouter>
        <Grid>
          <Grid.Row style={{ marginBottom: '5vh'}}>
            <NavResponsive />
          </Grid.Row>
          <Grid.Row >
            <Switch>
              <Route exact path='/' component={DashResponsive} />
              <Route path='/login' component={Login} />>
              <Route path='/signup' component={Signup} />
              <Route path='/home' component={DashResponsive} />
              <Route exact path='/movies' component={InTheaters} />
              <Route path='/movies/:id' component={MovieShowResponsive} />
              <Route exact path='/series' component={OnAir} />
              <Route path='/series/:id' component={SeriesShowResponsive} />
              <Route path='/reviews/:medium/:id/new' component={CreateReviewResponsive} />
              <Route exact path='/friends' component={FriendsResponsive} />
              <Route exact path='/profile/:id' component={ProfileResponsive} />
              <Route path='/reviews/:id/edit' component={CreateReviewResponsive} />
              <Route path='/profile/:id/edit' component={EditProfile} />
              <Route path='/search' component={SearchPageResponsive} />
            </Switch>
          </Grid.Row>
        </Grid>
      </BrowserRouter>
  );
}

export default App;

