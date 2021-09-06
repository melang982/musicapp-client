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
  const [isPlaying, setIsPlaying] = useState(null);
  const [duration, setDuration] = useState(null);
  const [playbackTime, setPlaybackTime] = useState(null);
  const [progress, setProgress] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [shouldRepeat, setShouldRepeat] = useState(false);
  const [shouldShuffle, setShouldShuffle] = useState(false);

  const [playButtonState, setPlayButtonState] = useState(true);

  let albumCoverUrl = currentTrack && '/images/album/' + currentTrack.album.id + '.jpg';

  useEffect(() => {
    const interval = setInterval(() => {

      if (startedAt && isPlaying) {
        let playbackTime = (Date.now() - startedAt) / 1000;

        if (playbackTime >= duration) {
          playbackTime = duration;

          if (shouldRepeat) 
            jumpTo(0);
          else 
            playNext();
          }
        
        setProgress(Math.min(playbackTime / duration, 1));
        setPlaybackTime(playbackTime);
      }
    }, 50);

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
    
    let newPlayer = loadFile(currentTrack.id, setStartedAt, setDuration, setIsPlaying);
    newPlayer.setVolume(volume);
    console.log(newPlayer);
    setPlayer(newPlayer);
    document.title = currentTrack.title + ' · ' + currentTrack.artist;
  }

  function onPlayButtonClick() {
    if (!currentTrack) 
      return;
    
    console.log('onPlayButtonClick');
    if (!player) {
      createPlayer();

    } else {
      player.play();
    }

    setPlayButtonState(false);
  }

  function onStopButtonClick() {
    console.log(player);
    player && player.stop();
    setPlayButtonState(true);
    document.title = 'Pandora – Web Player';
  }

  function jumpTo(value) {
    let timeSeconds = duration * value;
    //console.log(timeSeconds);
    player.play(timeSeconds);
    setProgress(value);
  }

  function playPrevious() {
    let index = trackList.findIndex(x => x.id === currentTrack.id) - 1;

    if (index < 0) 
      index = trackList.length + index;
    
    //console.log(index);
    currentTrackVar(trackList[index]);
  }

  function playNext() {
    const index = (trackList.findIndex(x => x.id === currentTrack.id) + 1) % trackList.length;

    currentTrackVar(trackList[index]);
  }

  function changeVolume(value) {
    //console.log(value);
    setVolume(value);
    player && player.setVolume(value);
  }

  function mute() {
    setIsMuted(true);
    player && player.setVolume(0);
  }

  function unMute() {
    setIsMuted(false);
    player && player.setVolume(volume);
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
    <Button icon="shuffle" activated={shouldShuffle} onClicked={() => setShouldShuffle(!shouldShuffle)}/>
    <Button icon="previous" onClicked={playPrevious}/> {
      playButtonState
        ? <Button icon="play" styleName="button_play" onClicked={onPlayButtonClick}/>
        : <Button icon="pause" styleName="button_play" onClicked={onStopButtonClick}/>
    }
    <Button icon="next" onClicked={playNext}/>

    <Button icon="repeat" activated={shouldRepeat} onClicked={() => setShouldRepeat(!shouldRepeat)}/> {
      isMuted
        ? <Button icon="volumeOff" styleName="button_volume" onClicked={unMute}/>
        : <Button icon="volume" styleName="button_volume" onClicked={mute}/>
    }
    <ProgressBar progress={isMuted
        ? 0
        : volume} updateValue={changeVolume} shouldUpdateOnDrag="true" style={{
        width: '106px',
        marginRight: '23.3px'
      }}/>

    <span className="player_time">{secondsToTime(playbackTime)}</span>

    <ProgressBar progress={progress} updateValue={jumpTo} style={{
        width: '586px',
        marginRight: '1px'
      }}/>
    <span className="player_time">{secondsToTime(duration)}</span>
  </div>;
}

export default Player;
