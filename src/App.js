import React, {useState} from 'react';
import './App.css';

import {loadFile} from './audio.js';

function App() {

  const [player, setPlayer] = useState(null);
  //const [playState, setPlayState] = useState('play');

  function onPlayButtonClick() {
    if (!player) {
      let newPlayer = loadFile();
      console.log(newPlayer);
      setPlayer(newPlayer);
    } else {
      player.play();
    }
  }

  function onStopButtonClick() {
    console.log(player);
    player.stop();
    //setPlayState('stop');
  }

  return (<div className=" App">
    hello react
    <button onClick={onPlayButtonClick}>
      Play
    </button>
    <button onClick={onStopButtonClick}>
      Stop
    </button>
  </div>);
}

export default App;
