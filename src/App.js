import React from 'react';
import './styles/app.scss';
import './styles/components.scss';

import Sidebar from './components/Sidebar';
import Artist from './components/Artist';
import AlbumPage from './components/AlbumPage';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  return (<Router>

    <div className="app noselect">

      <Sidebar/>

      <Switch >
        <Route path="/artist/:id">
          <Artist/>
        </Route>
        <Route path="/album">
          <AlbumPage/>
        </Route>
      </Switch>

    </div>

  </Router>);
}

export default App;
