import React, {useState} from 'react';
import './App.scss';
import './components/components.scss';

import ProgressBar from './components/ProgressBar';
import Button from './components/Button';
import Track from './components/Track';

import {loadFile} from './audio.js';

import {useQuery, gql} from '@apollo/client';

const ARTIST_QUERY = gql `
  {
    artist(id:1){
    name
    albums {
      title
    }
  }
  }
`;

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

  const {data} = useQuery(ARTIST_QUERY);
  //console.log(data);

  return (<div className="app">
    <img className="bg" src="BG.png" alt="background"/>
    <div className="shadow"></div>
    <div className="sidebar"></div>
    <div className="main">
      <div className="save">Save to My stars</div>
      <h1>Gorillaz</h1>
      <div className="tracks">{data && data.artist.albums.map((track) => <Track key={track.id} track={track}/>)}</div>
    </div>

    <div className="player player_red">

      <img className="player__album-cover" src="Album.png" alt="Album cover"/>
      <div className="player__track-info">
        <p className="player__track">
          Rhinestone Eyes
        </p>
        <p className="player__artist">
          Gorillaz
        </p>
      </div>
      <div className="player__buttons">
        <div className="player__oval">
          <img src="Oval.svg" alt="Oval"/> {
            playButtonState
              ? <Button icon="play" onClicked={onPlayButtonClick}/>
              : <Button icon="pause" onClicked={onStopButtonClick}/>
          }
        </div>
      </div>
      <Button icon="volume" onClicked={onStopButtonClick}/>
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
