import {useParams} from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';

import Search from './Search';
import SaveButton from './SaveButton';
import Album from './Album';
import Track from './Track';

import {NavLink} from 'react-router-dom';
import '../styles/artist.scss';

function Artist() {

  let {id} = useParams();
  let backgroundUrl = '/images/artist/' + id + '.png';
  //console.log('requested artist id: ' + id);

  const ARTIST_QUERY = gql `
    {
      artist(id:${id}){
      name
      albums {
        id
        title
        year
        tracks {
          id
          title
          duration
        }
      }
    }
    }
  `;

  const {data} = useQuery(ARTIST_QUERY);
  console.log(data);

  const tracks = data && data.artist.albums.flatMap(x => { //add album name to tracks
    let newTracks = x.tracks.map(y => ({
      ...y,
      artist: data.artist.name,
      album: {
        title: x.title,
        id: x.id
      }
    }));
    return newTracks
  })

  console.log(tracks);

  return <div className="artist">

    <img className="bg" src={backgroundUrl} alt="background"/>
    <div className="bg bg-gradient"/>
    <div className="shadow"></div>

    <Search/>

    <SaveButton/>

    <h1>{data && data.artist.name}</h1>

    <div className="artist__menu">
      <NavLink to={'/artist/' + id + '/albums'}>Albums</NavLink>
      <NavLink to={'/artist/' + id + '/about'}>About</NavLink>
      <NavLink to={'/artist/' + id + '/related'}>Related artists</NavLink>
      <hr/>
    </div>
    
    <div className="artist__albums">
      {data && data.artist.albums.map((album) => <Album key={album.id} album={album}/>)}
    </div>

    <div className="tracks">
      <div className="tracks__title">Random selection</div>
      {tracks && tracks.map((track) => <Track key={track.id} track={track}/>)}
    </div>
  </div>
}
export default Artist;
