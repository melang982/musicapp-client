import React from 'react';
import './styles/app.scss';
import './styles/components.scss';

import Sidebar from './components/Sidebar';
import Artist from './components/Artist';
import Playlist from './components/Playlist';
import AlbumPage from './components/AlbumPage';
import Login from './components/Login';
import Signup from './components/Signup';

import {AUTH_TOKEN} from './constants';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

const authToken = localStorage.getItem(AUTH_TOKEN);

function App() {

  return (<Router>

    <div className="app noselect">

      <Sidebar/> {!authToken && <Link to="/signup" className="link_signup">Sign up</Link>}

      {
        authToken ? <div className="avatar"/> : <Link to="/login" className="link_signup">
        Log in</Link>
      }

      <Switch >
        <Route path="/artist/:id">
          <Artist/>
        </Route>
        <Route path="/playlists/:id">
          <Playlist/>
        </Route>
        <Route path="/album">
          <AlbumPage/>
        </Route>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
      </Switch>

    </div>

  </Router>);
}

export default App;
