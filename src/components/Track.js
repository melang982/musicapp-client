import {connect} from 'react-redux'
import SoundBars from './SoundBars';
import {secondsToTime} from './../utils.js';

function Track(props) {
  const {track, currentTrack} = props;

  function onClicked() {
    console.log('clicked!');
    props.dispatch({type: 'SET_TRACK', payload: track})
  }

  return <div className="track" onClick={onClicked}>
    <div>
      <p className="track__name">
        {track.title}
      </p>
      <p className="track__album">
        {track.album.title}
      </p>
    </div>
    {currentTrack && currentTrack.id == track.id && <SoundBars/>}
    <p className="track__time">
      {secondsToTime(track.duration)}
    </p>
  </div>
}

const mapStateToProps = state => {
  return {currentTrack: state.currentTrack}
}

const mapDispatchToProps = dispatch => {
  return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(Track)
