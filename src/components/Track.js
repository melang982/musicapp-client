import {connect} from 'react-redux'
import SoundBars from './SoundBars';

function Track(props) {
  const {track, currentTrack} = props;

  function onClicked() {
    console.log('clicked!');
    props.dispatch({type: 'SET_TRACK', payload: track.id})
  }

  return <div className="track" onClick={onClicked}>
    <div>
      <p className="track__name">
        {track.title}
      </p>
      <p className="track__album">
        Epoch
      </p>
    </div>
    {currentTrack == track.id && <SoundBars/>}
    <p className="track__time">
      3:53
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
