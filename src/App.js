import React, {useState} from 'react';
import './App.scss';
import './components/components.scss';

import IconPlay from './components/icons/IconPlay';
import IconPause from './components/icons/IconPause';
import IconVolume from './components/icons/IconVolume';
import ProgressBar from './components/ProgressBar';
import Button from './components/Button';

import {loadFile} from './audio.js';

function App() {

  const [player, setPlayer] = useState(null);
  const [playButtonState, setPlayButtonState] = useState(true);

  function onPlayButtonClick() {
    console.log("onPlayButtonClick");
    if (!player) {
      let newPlayer = loadFile();
      console.log(newPlayer);
      setPlayer(newPlayer);
    } else {
      player.play();
    }
    setPlayButtonState(false);
  }

  function onStopButtonClick() {
    console.log(player);
    player.stop();
    setPlayButtonState(true);
  }

  return (<div className="app">
    <img className="bg" src="BG.png" alt="background"/>
    <div className="shadow"></div>

    <div className="sidebar"></div>
    <div className="player player_red">

      <img className="player__album" src="Album.png" alt="Album cover" width="40" height="40"/>
      <div className="player__buttons">
        <div className="player__oval">
          <img src="Oval.svg" alt="Oval"/> {
            playButtonState
              ? <Button icon="play" onClicked={onPlayButtonClick}/>
              : <Button icon="pause" onClicked={onStopButtonClick}/>
          }
        </div>
      </div>
      <IconVolume/>
      <ProgressBar style={{
          width: '106px',
          marginLeft: '20px'
        }}/>
      <ProgressBar style={{
          width: '586px',
          marginLeft: '50px'
        }}/>
    </div>
  </div>);
}

export default App;
