import {useState} from 'react';
import {connect} from 'react-redux'
import Button from './Button';
import ProgressBar from './ProgressBar';
import {loadFile} from './../audio.js';

function Player(props) {
  const {currentTrack} = props;
  const [player, setPlayer] = useState(null);
  const [playButtonState, setPlayButtonState] = useState(true);

  let albumCoverUrl = currentTrack && '/images/album/' + currentTrack.album.id + '.jpg';

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

  return <div className="player player_red">

    { currentTrack && <img className="player__album-cover" src={albumCoverUrl} alt="Album cover"/> }

    <div className="player__track-info">
      <p className="player__track">
          { currentTrack && currentTrack.title }
      </p>
      <p className="player__artist">
          { currentTrack && currentTrack.artist }
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
      }}/>
    <ProgressBar style={{
        width: '586px',
        marginLeft: '50px'
      }}/>
  </div>;
}

const mapStateToProps = state => {
  return {currentTrack: state.currentTrack}
}

export default connect(mapStateToProps)(Player)
