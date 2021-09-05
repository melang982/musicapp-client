import {useReactiveVar} from '@apollo/client';
import {currentTrackVar} from '../cache';

import SoundBars from './SoundBars';
import {secondsToTime} from './../utils.js';

function Track({track}) {

  const currentTrack = useReactiveVar(currentTrackVar);

  function onClicked() {
    console.log('clicked!');
    currentTrackVar(track);
    //console.log(currentTrack);
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

export default Track;
