import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginResponsive from './containers/LoginResponsive';
import Signup from './containers/Signup';
import { Grid } from 'semantic-ui-react';
import './App.css';
import InTheaters from './containers/InTheaters';
import OnAir from './containers/OnAir';
import CreateReviewResponsive from './containers/CreateReviewResponsive';
import FriendsResponsive from './containers/FriendsResponsive';
import ProfileResponsive from './containers/ProfileResponsive';
import SearchPageResponsive from './containers/SearchPageResponsive';
import DashResponsive from './containers/DashResponsive';
import NavResponsive from './components/NavResponsive';
import MovieShowResponsive from './components/MovieShowResponsive';
import SeriesShowResponsive from './components/SeriesShowResponsive';
import EditProfileResponsive from './containers/EditProfileResponsive';

function App() {
  return (
      <BrowserRouter>
        <Grid>
          <Grid.Row style={{ marginBottom: '5vh'}}>
            <NavResponsive />
          </Grid.Row>
          <Grid.Row style={{paddingTop: '0vh'}}>
            <Switch>
              <Route exact path='/' component={DashResponsive} />
              {/* Make Login and Signup pages responsive */}
              <Route path='/login' component={LoginResponsive} />
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
              <Route path='/profile/:id/edit' component={EditProfileResponsive} />
              <Route path='/search' component={SearchPageResponsive} />
            </Switch>
          </Grid.Row>
        </Grid>
      </BrowserRouter>
  );
}

export default App;

