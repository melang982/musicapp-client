import { currentTrackVar, tracklistVar } from '../cache';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { secondsToTime } from './../utils.js';
import AlbumCover from './AlbumCover';
import Button from './Button';

import '../styles/playlist.scss';

function Playlist() {

  const { id } = useParams();
  console.log(id);

  const PLAYLIST_QUERY = gql `
    {
      playlist(id:${id}){
      title
      tracks {
        id
        title
        artist {
          id
          name
        }
        album {
          id
          title
        }
        duration
      }
      createdBy {
        id
        name
      }
    }
    }
  `;

  const { data } = useQuery(PLAYLIST_QUERY);
  console.log(data);

  const tracks = data && data.playlist.tracks;
  console.log(tracks);



  function onClicked(track) {
    console.log('clicked!');
    currentTrackVar(track);
    tracklistVar(tracks);
  }

  return <div className="playlist">

    { tracks && <AlbumCover track={tracks[0]}/>}
    <div className="playlist__info">
      <span className="playlist__type">Playlist</span>
      <h1>{data && data.playlist.title}</h1>
      {data && data.playlist.createdBy &&
      <>
        <span className="playlist__user">{data.playlist.createdBy.name}</span>
        <span className="playlist__duration">{' · ' + data.playlist.tracks.length + ' songs'}</span>
      </>
      }
    </div>

    <table>
      <tbody>
        <tr>
          <td>#</td>
          <td>Title</td>
          <td>Album</td>
          <td>Date added</td>
          <td>Duration</td>
        </tr>
        {tracks && tracks.map((track, index) =>
        <tr key={track.id}>
          <td><span>{index+1}</span><Button icon="play" title={'Play ' + track.title + ' by ' + track.artist.name} onClicked={() => onClicked(track)}/></td>
          <td>
            <AlbumCover track={track}/>
            <div>
              <p className="playlist__track-title">{track.title}</p>
              <Link to={'/artist/' + track.artist.id}>{track.artist.name}</Link>
            </div>
          </td>
          <td><Link to={'/album/' + track.album.id}>{track.album.title}</Link></td>
          <td>2 days ago</td>
          <td>{secondsToTime(track.duration)}</td>
        </tr>)
        }
      </tbody>
    </table>

  </div>;
}
export default Playlist;