import { Helmet } from 'react-helmet';
import { currentTrackVar, tracklistVar, userVar } from '../cache';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useReactiveVar } from '@apollo/client';
import { secondsToTime, TimeAgo } from './../utils.js';
import { PLAYLIST_QUERY } from './../queries.js';

import AlbumCover from '../components/AlbumCover';
import Button from '../components/Button';
import PlaylistSearch from '../components/PlaylistSearch';

import '../styles/playlist.scss';

function Playlist() {
  const user = useReactiveVar(userVar);

  const { id } = useParams();
  //console.log(id);

  const { data } = useQuery(PLAYLIST_QUERY, { variables: { id: parseInt(id) } });
  //console.log(data);

  const tracks = data && data.playlist.tracks;
  const album = tracks && tracks[0] && tracks[0].track.album;
  //console.log(tracks);

  const songsString = tracks && tracks.length + (tracks.length === 1 ? ' song,' : ' songs,');

  const totalDuration = tracks && tracks.reduce((previousValue, currentValue) => { return previousValue + currentValue.track.duration }, 0);
  //console.log(totalDuration);

  const timeString = parseInt(totalDuration / 60) + ' min ' + (totalDuration % 60) + ' sec';
  const background = data && data.playlist.tracks[0] ? 'linear-gradient(180deg, #' + data.playlist.tracks[0].track.album.color + ', #25242c)' : 'linear-gradient(180deg , #8da7ba, #25242c)';

  function onTrackClick(track) {
    //console.log('clicked!');
    currentTrackVar(track);
    tracklistVar(tracks);
  }

  return <div className="playlist" style={{background: background}}>
    <Helmet>
       <title>{ data && data.playlist.title + ' – playlist' }</title>
    </Helmet>

    { album && <AlbumCover id={album.id}/>}

    <div className="playlist__info">
      <span className="playlist__type">Playlist</span>
      <h1>{data && data.playlist.title}</h1>
      {data && data.playlist.createdBy &&
      <>
        <span className="playlist__author">{data.playlist.createdBy.name}</span>
        <span className="playlist__duration">{tracks.length > 0 && ' · ' + songsString + ' ' + timeString}</span>
      </>
      }
    </div>

    {user.name &&
      <>
        {tracks && !tracks.length && <h3>Let's find something for your playlist</h3>}
        <PlaylistSearch playlistId={ parseInt(id) }/>
      </>}

    {tracks && tracks.length > 0 && <table>
      <tbody>
        <tr>
          <td>#</td>
          <td>Title</td>
          <td>Album</td>
          <td>Date added</td>
          <td>Duration</td>
        </tr>
        {tracks.map((t, index) =>
        <tr key={t.track.id}>
          <td><span>{index+1}</span><Button icon="play" title={'Play ' + t.track.title + ' by ' + t.track.artist.name} onClick={() => onTrackClick(t.track)}/></td>
          <td className="playlist__track-info">
            <AlbumCover id={t.track.album.id}/>
            <div>
              <p className="playlist__track-title">{t.track.title}</p>
              <Link to={'/artist/' + t.track.artist.id}>{t.track.artist.name}</Link>
            </div>
          </td>
          <td><Link to={'/album/' + t.track.album.id}>{t.track.album.title}</Link></td>
          <td>{TimeAgo.inWords(t.assignedAt)}</td>
          <td>{secondsToTime(t.track.duration)}</td>
        </tr>)
        }
      </tbody>
    </table>}

  </div>;
}
export default Playlist;