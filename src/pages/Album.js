import { Helmet } from 'react-helmet';
import { currentTrackVar, tracklistVar } from '../cache';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { secondsToTime } from './../utils.js';
import { isMobile, isDesktop } from 'react-device-detect';
import AlbumCover from '../components/AlbumCover';
import Button from '../components/Button';

function Album({ children }) {
  const { id } = useParams();
  const currentTrack = useReactiveVar(currentTrackVar);
  //console.log(id);

  const ALBUM_QUERY = gql `
    {
      album(id:${id}){
      title
      year
      color
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

  const { data } = useQuery(ALBUM_QUERY, {
    onCompleted: result => {
      if (!currentTrack && result) {
        const t = result.album.tracks.map(x => ({ ...x, album: { id: id, title: result.album.title }, artist: { id: id, name: result.album.artist.name } }));
        tracklistVar(t);
      }
    }
  });
  const tracks = data && data.album.tracks.map(x => ({ ...x, album: { id: id, title: data.album.title }, artist: { id: id, name: data.album.artist.name } }));
  //console.log(tracks);
  const artist = data && data.album.artist;

  const songsString = tracks && tracks.length + (tracks.length === 1 ? ' song' : ' songs');

  const background = (data && data.album.color) ? 'linear-gradient(180deg, #' + data.album.color + ', #25242c)' : 'linear-gradient(180deg , #8da7ba, #25242c)';

  function onClick(track) {
    //console.log('clicked!');
    currentTrackVar(track);
    tracklistVar(tracks);
  }

  return <>
  <Helmet>
     <title>{ data && data.album.title + ' – ' + artist.name }</title>
  </Helmet>

  { isDesktop &&
    <div className="playlist" style={isMobile ? {} : { background: background}}>

      { tracks && <AlbumCover id={id}/> }

      <div className="playlist__info">
          <span className="playlist__type">Album</span>
          <h1>{data && data.album.title}</h1>
          {data &&
          <>
            <Link to={'/artist/' + artist.id} className="playlist__author">{artist.name}</Link>
            <span className="playlist__duration">{' · ' + data.album.year + ' · ' + songsString}</span>
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
              <td>
                <span>{index+1}</span>
                <Button icon="play" title={'Play ' + track.title + ' by ' + artist.name} onClick={() => onClick(track)}/>
              </td>
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
    </div>
  }
  { isMobile &&
    <>
      { tracks && <AlbumCover id={id} className="album__cover"/> }

      <h3>Album</h3>
      <h1>{data && data.album.title}</h1>
      {data && <Link to={'/artist/' + artist.id} className="playlist__author">{artist.name}</Link>}
      {children}
      <table>
        <tbody>
            {tracks && tracks.map((track, index) =>
            <tr key={track.id} onClick={() => onClick(track)}>
              <td><span>{index+1}</span></td>
              <td><p className="playlist__track-title">{track.title}</p></td>
            </tr>)
            }
        </tbody>
      </table>
    </>
  }
  </>;
}
export default Album;