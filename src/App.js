import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { isDesktop, isMobile } from 'react-device-detect';

import './styles/app.scss';
import './styles/components.scss';

import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Header from './components/Header';

import Album from './pages/Album';
import Artist from './pages/Artist';
import Login from './pages/Login';
import Main from './pages/Main';
import Playlist from './pages/Playlist';
import Signup from './pages/Signup';
import Stars from './pages/Stars';

function App() {

  return (<Router>

    <div className={isMobile ? "app_mobile" : "app noselect"}>
          { isDesktop &&
            <Switch>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={Signup}/>
              <Route>
                <Header/>
                <Sidebar/>
                <Player/>
                <Switch>
                  <Route path="/artist/:id" component={Artist}/>
                  <Route path="/playlists/:id" component={Playlist}/>
                  <Route path="/album/:id" component={Album}/>
                  <Route path="/stars" component={Stars}/>
                  <Route component={Main}/>
                </Switch>
            </Route>
          </Switch>
          }
          { isMobile &&
            <>
              <h1>Pandora</h1>
              <Player/>
            </>
             }
    </div>

  </Router>);
}

export default App;