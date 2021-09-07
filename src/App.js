import React from 'react';
import './styles/app.scss';
import './styles/components.scss';

import Sidebar from './components/Sidebar';
import Artist from './components/Artist';
import AlbumPage from './components/AlbumPage';
import Login from './components/Login';
import Signup from './components/Signup';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {

  return (<Router>

    <div className="app noselect">

      <Sidebar/>

      <Link to="/signup" className="link_signup">Sign up</Link>
      
      <Switch >
        <Route path="/artist/:id">
          <Artist/>
        </Route>
        <Route path="/album">
          <AlbumPage/>
        </Route>
        <Route exact="exact" path="/login" component={Login}/>
        <Route exact="exact" path="/signup" component={Signup}/>
      </Switch>

    </div>

  </Router>);
}

export default App;
