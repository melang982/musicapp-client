import {connect} from 'react-redux'
import SoundBars from './SoundBars';
import {secondsToTime} from './../utils.js';

function Track({track, currentTrack, dispatch}) {

  function onClicked() {
    console.log('clicked!');
    dispatch({type: 'SET_TRACK', payload: track})
  }

  const isActiveTrack = currentTrack && currentTrack.id == track.id;
  let className = 'track';
  if (isActiveTrack) 
    className += ' track_active';
  
  return <div className={className} onClick={onClicked}>
    <div>
      <p className="track__name">
        {track.title}
      </p>
      <p className="track__album">
        {track.album.title}
      </p>
    </div>
    {isActiveTrack && <SoundBars/>}
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
