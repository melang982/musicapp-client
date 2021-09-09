import { currentTrackVar, tracklistVar } from '../cache';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { secondsToTime } from './../utils.js';
import AlbumCover from './AlbumCover';
import Button from './Button';

function Album() {

  const { id } = useParams();
  console.log(id);

  const ALBUM_QUERY = gql `
    {
      album(id:${id}){
      title
      year
      artist {
        id
        name
      }
      tracks {
        id
        title
        duration
      }
    }
    }
  `;

  const { data } = useQuery(ALBUM_QUERY);
  console.log(data);

  const tracks = data && data.album.tracks.map(x => ({ ...x, album: { id: id, title: data.album.title }, artist: { id: id, name: data.album.artist.name } }));
  console.log(tracks);

  const artist = data && data.album.artist;

  function onClick(track) {
    console.log('clicked!');
    currentTrackVar(track);
    tracklistVar(tracks);
  }

  return <div className="playlist">

    { tracks && <AlbumCover track={tracks[0]}/>}

    <div className="playlist__info">
      <span className="playlist__type">Album</span>
      <h1>{data && data.album.title}</h1>
      {data &&
      <>
        <Link to={'/artist/' + artist.id} className="playlist__author">{artist.name}</Link>
        <span className="playlist__duration">{' · ' + data.album.year + ' · ' + tracks.length + ' songs'}</span>
      </>
      }
    </div>

    <table>
      <tbody>
        <tr>
          <td>#</td>
          <td>Title</td>
          <td>Duration</td>
        </tr>
        {tracks && tracks.map((track, index) =>
        <tr key={track.id}>
          <td><span>{index+1}</span><Button icon="play" title={'Play ' + track.title + ' by ' + artist.name} onClick={() => onClick(track)}/></td>
          <td>
            <div>
              <p className="playlist__track-title">{track.title}</p>
              <Link to={'/artist/' + artist.id}>{artist.name}</Link>
            </div>
          </td>
          <td>{secondsToTime(track.duration)}</td>
        </tr>)
        }
      </tbody>
    </table>

  </div>;
}
export default Album;