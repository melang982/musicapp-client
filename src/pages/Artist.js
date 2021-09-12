import { Helmet } from 'react-helmet';
import { useState, useRef } from 'react';
import { useParams, NavLink, Switch, Route } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Search from '../components/Search';
import SaveButton from '../components/SaveButton';
import ArtistAlbum from '../components/ArtistAlbum';
import Track from '../components/Track';

import '../styles/artist.scss';

function Artist({ location }) {
  const { id } = useParams();
  const ARTIST_QUERY = gql `
    query getArtist {
      artist(id:${id}){
        id
        name
        description
        userStars
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
  //console.log(location);

  const menuRef = useRef(null);

  let menuIndex = 0;
  if (location.pathname.endsWith('about')) menuIndex = 1;
  else if (location.pathname.endsWith('related')) menuIndex = 2;

  const [activeIndex, setActiveIndex] = useState(menuIndex);

  const backgroundUrl = '/images/artist/' + id + '.png';
  //console.log('requested artist id: ' + id);

  const { data } = useQuery(ARTIST_QUERY);
  //console.log(data);

  const tracks = data && data.artist.tracks.map(x => ({ ...x, artist: { id: id, name: data.artist.name } }));
  //console.log(tracks);

  function onNavClick(e) {
    //console.log('click');
    const index = Array.from(e.target.parentNode.children).indexOf(e.target);
    setActiveIndex(index);
  }

  function getWidth() {
    return menuRef.current && menuRef.current.children[activeIndex].offsetWidth;
  }

  function getLeft() {
    console.log('getLeft');
    return menuRef.current && menuRef.current.children[activeIndex].offsetLeft;
  }

  return <div className="artist">
    <Helmet>
       <title>{ data && data.artist.name + ' – listen online' }</title>
    </Helmet>

    <img className="bg" src={backgroundUrl} alt="background"/>
    <div className="bg bg-gradient"/>
    <div className="shadow"></div>

    <Search/>

    {data && <SaveButton artist={ data.artist }/>}

    <h1>{data && data.artist.name}</h1>

    <div ref={ menuRef } className="artist__menu">
      <NavLink to={'/artist/' + id + '/albums'} onClick={onNavClick}>Albums</NavLink>
      <NavLink to={'/artist/' + id + '/about'} onClick={onNavClick}>About</NavLink>
      <NavLink to={'/artist/' + id + '/related'} onClick={onNavClick}>Related artists</NavLink>
      <hr style={{ width: getWidth(), marginLeft: getLeft() }}/>
    </div>

    <Switch>
      <Route path="/artist/:id/about">
      <p className="artist__about">{data && data.artist.description}</p>
      </Route>
      <Route path="/artist/:id/related"><p className="artist__about">Nothing here yet</p></Route>
      <Route>
        <div className="artist__albums">
          {data && data.artist.albums.map((album) => <ArtistAlbum key={album.id} album={album}/>)}
        </div>
      </Route>
    </Switch>

    <div className="tracks">
      <div className="tracks__title">Random selection</div>
      {tracks && tracks.map((track) => <Track key={track.id} track={track} tracks={tracks}/>)}
    </div>

  </div>
}
export default Artist;