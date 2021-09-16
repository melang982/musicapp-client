import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { isDesktop, isMobile } from 'react-device-detect';
import { currentTrackVar, tracklistVar } from '../cache';
import Button from './Button';
import ProgressBar from './ProgressBar';
import AlbumCover from './AlbumCover';
import { loadFile } from './../audio.js';
import { secondsToTime, shuffle } from './../utils.js';
import '../styles/player.scss';

function Player() {

  const currentTrack = useReactiveVar(currentTrackVar);
  const tracklist = useReactiveVar(tracklistVar);

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
  const [shuffledTracklist, setShuffledTracklist] = useState(null);

  const [playButtonState, setPlayButtonState] = useState(true);

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

    return () => {
      clearInterval(interval);
    }
  });

  useEffect(() => {
    if (currentTrack) {
      console.log('CHANGED TRACK');
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
    if (!currentTrack) {
      console.log(tracklist);
      if (tracklist && tracklist.length > 0) currentTrackVar(tracklist[0]);
      return;
    }

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
    if (!currentTrack) return;

    let index = tracklist.findIndex(x => x.id === currentTrack.id) - 1;

    if (index < 0) index = tracklist.length + index;

    //console.log(index);
    currentTrackVar(tracklist[index]);
  }

  function playNext() {
    if (!currentTrack) return;

    const tracklistToUse = shouldShuffle ? shuffledTracklist : tracklist;

    const index = (tracklistToUse.findIndex(x => x.id === currentTrack.id) + 1) % tracklist.length;

    currentTrackVar(tracklistToUse[index]);
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

  function shuffleTracks(value) {
    if (!tracklist) return;

    setShouldShuffle(value);
    if (value) {
      const sList = tracklist.slice();
      shuffle(sList);
      setShuffledTracklist(sList);
    }
  }

  return <>{isDesktop &&
    <div className="player">
      <div className="player__shadow"></div>

      {currentTrack && <Link to={'/album/' + currentTrack.album.id} className="player__album"><AlbumCover id={currentTrack.album.id}/></Link>}

      <div className="player__track-info">
        <p className="player__track">
          {currentTrack && currentTrack.title}
        </p>
        {currentTrack && <Link to={'/artist/' + currentTrack.artist.id} className="player__artist">{currentTrack.artist.name}</Link>}
      </div>

      <Button icon="shuffle" title={shouldShuffle ? 'Disable shufle' : 'Enable shuffle'} activated={shouldShuffle} onClick={() => shuffleTracks(!shouldShuffle)}/>
      <Button icon="previous" title="Previous" onClick={playPrevious}/>
      {
        playButtonState
          ? <Button icon="play" title="Play" className="button_play" onClick={onPlayButtonClick}/>
          : <Button icon="pause" title="Pause" className="button_play" onClick={onStopButtonClick}/>
      }
      <Button icon="next" title="Next" onClick={playNext}/>
      <Button icon="repeat" title={shouldRepeat ? 'Disable repeat' : 'Enable repeat'} activated={shouldRepeat} onClick={() => setShouldRepeat(!shouldRepeat)}/>
      {
        isMuted
          ? <Button icon="volumeOff" title="Unmute" className="button_volume" onClick={unMute}/>
          : <Button icon="volume" title="Mute" className="button_volume" onClick={mute}/>
      }
      <ProgressBar progress={isMuted ? 0 : volume} updateValue={changeVolume} shouldUpdateOnDrag="true" className="progress_volume" />

      <span className="player_time">{secondsToTime(playbackTime)}</span>

      <ProgressBar progress={progress} updateValue={jumpTo} className="progress_duration" />
      <span className="player_time">{secondsToTime(duration)}</span>
    </div>
  }
  { isMobile && <>
    {
      playButtonState
        ? <Button icon="play" title="Play" className="button_play_mobile" onClick={onPlayButtonClick}/>
        : <Button icon="pause" title="Pause" className="button_play_mobile" onClick={onStopButtonClick}/>
    }
  </> }
</>;
}

export default Player;