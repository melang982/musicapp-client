import { useReactiveVar } from '@apollo/client';
import { currentTrackVar, tracklistVar } from '../cache';

import SoundBars from './SoundBars';
import { secondsToTime } from './../utils.js';

function Track({ track, tracks }) {

  const currentTrack = useReactiveVar(currentTrackVar);

  function onClick() {
    console.log('clicked!');
    currentTrackVar(track);
    tracklistVar(tracks);
    //console.log(currentTrack);
  }

  const isActiveTrack = currentTrack && currentTrack.id === track.id;
  const className = 'track' + (isActiveTrack ? ' track_active' : '');

  return <div className={className} onClick={onClick}>
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