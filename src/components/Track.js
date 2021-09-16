import { useReactiveVar } from '@apollo/client';
import { currentTrackVar, tracklistVar } from '../cache';
import { isMobile, isDesktop } from 'react-device-detect';
import SoundBars from './SoundBars';
import AlbumCover from './AlbumCover';
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
  const className = isMobile ? 'track_mobile' : 'track' + (isActiveTrack ? ' track_active' : '');

  return <div className={className} onClick={onClick}>
    {isMobile && <AlbumCover id={track.album.id} />}
    <div>
      <p className="track__title">
        {track.title}
      </p>
      <p className="track__album">
        {track.album.title}
      </p>
    </div>
    {isDesktop && isActiveTrack && <SoundBars/>}
    {isDesktop && <p className="track__time">{ secondsToTime(track.duration) }</p>}
  </div>
}

export default Track;