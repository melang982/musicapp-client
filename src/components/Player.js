import {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Button from './Button';
import ProgressBar from './ProgressBar';
import {loadFile} from './../audio.js';
import '../styles/player.scss';

function Player(props) {
  const {currentTrack} = props;
  const [player, setPlayer] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [duration, setDuration] = useState(null);
  const [playbackTime, setPlaybackTime] = useState(null);
  const [progress, setProgress] = useState(null);

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

  function onPlayButtonClick() {
    console.log("onPlayButtonClick");
    if (!player) {
      let newPlayer = loadFile(currentTrack.id, setStartedAt, setDuration);
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

  function secondsToTime(seconds) {
    return new Date(1000 * seconds).toISOString().substr(15, 4);
  }

  return <div className="player">

    {currentTrack && <img className="player__album-cover" src={albumCoverUrl} alt="Album cover"/>}

    <div className="player__track-info">
      <p className="player__track">
        {currentTrack && currentTrack.title}
      </p>
      <p className="player__artist">
        {currentTrack && currentTrack.artist}
      </p>
    </div>
    <div className="player__buttons">
      <div className="player__oval">
        <img src="/Oval.svg" alt="Oval"/> {
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
      }}/> {secondsToTime(playbackTime)}
    <ProgressBar progress={progress} style={{
        width: '586px',
        marginLeft: '50px'
      }}/> {secondsToTime(duration)}
  </div>;
}

const mapStateToProps = state => {
  return {currentTrack: state.currentTrack}
}

export default connect(mapStateToProps)(Player)
