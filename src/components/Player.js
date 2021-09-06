import {useState, useEffect} from 'react';
import {useReactiveVar} from '@apollo/client';
import {currentTrackVar} from '../cache';
import Button from './Button';
import ProgressBar from './ProgressBar';
import {loadFile} from './../audio.js';
import {secondsToTime} from './../utils.js';

import '../styles/player.scss';

function Player({trackList}) {

  const currentTrack = useReactiveVar(currentTrackVar);

  const [player, setPlayer] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [duration, setDuration] = useState(null);
  const [playbackTime, setPlaybackTime] = useState(null);
  const [progress, setProgress] = useState(null);
  const [volumeProgress, setVolumeProgress] = useState(0.5);

  const [playButtonState, setPlayButtonState] = useState(true);

  let albumCoverUrl = currentTrack && '/images/album/' + currentTrack.album.id + '.jpg';

  useEffect(() => {
    const interval = setInterval(() => {

      if (startedAt) {
        const playbackTime = (Date.now() - startedAt) / 1000;

        setProgress(Math.min(playbackTime / duration, 1));
        setPlaybackTime(playbackTime);
      }
    }, 50)

    return() => {
      clearInterval(interval);
    }
  });

  useEffect(() => {
    console.log('CHANGED TRACK');

    if (currentTrack) {
      createPlayer();
      setPlayButtonState(false);
    }

  }, [currentTrack]);

  function createPlayer() {
    if (player) 
      player.shutdown();
    
    let newPlayer = loadFile(currentTrack.id, setStartedAt, setDuration);
    console.log(newPlayer);
    setPlayer(newPlayer);
  }

  function onPlayButtonClick() {
    console.log('onPlayButtonClick');
    if (!player) {
      createPlayer()
    } else {
      player.play();
    }
    setPlayButtonState(false);
  }

  function onStopButtonClick() {
    console.log(player);
    player && player.stop();
    setPlayButtonState(true);
  }

  function ChangeVolume(value) {
    //console.log(value);
    setVolumeProgress(value);
    player && player.setVolume(value);
  }

  function JumpTo(value) {
    let timeSeconds = duration * value;
    //console.log(timeSeconds);
    player.play(timeSeconds);
    setProgress(value);
  }

  function onPreviousButtonClick() {
    let index = trackList.findIndex(x => x.id === currentTrack.id) - 1;

    if (index < 0) 
      index = trackList.length + index;
    
    //console.log(index);
    currentTrackVar(trackList[index]);
  }

  function onNextButtonClick() {
    const index = (trackList.findIndex(x => x.id === currentTrack.id) + 1) % trackList.length;

    currentTrackVar(trackList[index]);
  }

  return <div className="player">
    <div className="player__shadow"></div>

    {currentTrack && <img className="player__album-cover" src={albumCoverUrl} alt="Album cover"/>}

    <div className="player__track-info">
      <p className="player__track">
        {currentTrack && currentTrack.title}
      </p>
      <p className="player__artist">
        {currentTrack && currentTrack.artist}
      </p>
    </div>

    <Button icon="shuffle" onClicked={onPlayButtonClick}/>
    <Button icon="previous" onClicked={onPreviousButtonClick}/> {
      playButtonState
        ? <Button icon="play" styleName="button_play" onClicked={onPlayButtonClick}/>
        : <Button icon="pause" styleName="button_play" onClicked={onStopButtonClick}/>
    }
    <Button icon="next" onClicked={onNextButtonClick}/>
    <Button icon="repeat" activated="activated" onClicked={onPlayButtonClick}/>
    <Button icon="volume" styleName="button_volume" onClicked={() => ChangeVolume(0)}/>

    <ProgressBar progress={volumeProgress} updateValue={ChangeVolume} shouldUpdateOnDrag="true" style={{
        width: '106px',
        marginRight: '23.3px'
      }}/>

    <span className="player_time">{secondsToTime(playbackTime)}</span>

    <ProgressBar progress={progress} updateValue={JumpTo} style={{
        width: '586px',
        marginRight: '1px'
      }}/>
    <span className="player_time">{secondsToTime(duration)}</span>
  </div>;
}

export default Player;
