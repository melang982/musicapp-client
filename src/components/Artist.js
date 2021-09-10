import { Helmet } from 'react-helmet';
import { useParams, NavLink } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Search from './Search';
import SaveButton from './SaveButton';
import ArtistAlbum from './ArtistAlbum';
import Track from './Track';

import '../styles/artist.scss';

function Artist() {

  const { id } = useParams();
  const backgroundUrl = '/images/artist/' + id + '.png';
  //console.log('requested artist id: ' + id);

  const ARTIST_QUERY = gql `
    query getArtist {
      artist(id:${id}){
      name
      tracks {
        id
        title
        album {
          id
          title
        }
        duration
      }
      albums {
        id
        title
        year
      }
    }
    }
  `;

  const { data } = useQuery(ARTIST_QUERY);
  console.log(data);


  const tracks = data && data.artist.tracks.map(x => ({ ...x, artist: { id: id, name: data.artist.name } }));
  console.log(tracks);

  return <div className="artist">
    <Helmet>
       <title>{ data && data.artist.name + ' – listen online' }</title>
    </Helmet>

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
      {data && data.artist.albums.map((album) => <ArtistAlbum key={album.id} album={album}/>)}
    </div>

    <div className="tracks">
      <div className="tracks__title">Random selection</div>
      {tracks && tracks.map((track) => <Track key={track.id} track={track} tracks={tracks}/>)}
    </div>

  </div>
}
export default Artist;