import React from 'react';

import { Switch, Route } from 'react-router-dom'
import { Board } from './components/Board/Board'
import { CreatePlayer } from './components/CreatePlayer/CreatePlayer'
import { Lobby } from './components/Lobby/Lobby'

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize'

function App() {
  return (
    <Switch>
      <Route exact path = '/' component={CreatePlayer} /> 
      <Route exact path = '/board' component={Board} />
      <Route exact path = '/lobby' component={Lobby} />
    </Switch>
  );
}

export default App;
