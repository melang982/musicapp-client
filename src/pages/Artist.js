import { Helmet } from 'react-helmet';
import { useState, useRef } from 'react';
import { useParams, NavLink, Switch, Route } from 'react-router-dom';
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { isMobile, isDesktop } from 'react-device-detect';
import { currentTrackVar, tracklistVar } from '../cache';
import Search from '../components/Search';
import SaveButton from '../components/SaveButton';
import ArtistAlbum from '../components/ArtistAlbum';
import ArtistImage from '../components/ArtistImage';
import Track from '../components/Track';
import '../styles/artist.scss';

const ARTIST_QUERY = gql `
  query getArtist($id: Int!) {
    artist(id: $id){
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
        number
      }
      albums {
        id
        title
        year
      }
    }
  }
`;

function Artist({ children, location }) {
  const { id } = useParams();
  const currentTrack = useReactiveVar(currentTrackVar);

  const menuRef = useRef(null);

  let menuIndex = 0;
  if (isDesktop) {
    if (location.pathname.endsWith('about')) menuIndex = 1;
    else if (location.pathname.endsWith('related')) menuIndex = 2;
  }

  const [activeIndex, setActiveIndex] = useState(menuIndex);

  const backgroundUrl = '/images/artist/' + id + '.png';
  const backgroundUrl2x = '/images/artist/' + id + '_2x.png';
  //console.log('requested artist id: ' + id);

  const { data } = useQuery(ARTIST_QUERY, {
    variables: { id: parseInt(id) },
    onCompleted: result => {
      if (!currentTrack && result) {
        const t = result.artist.tracks.map(x => ({ ...x, artist: { id: id, name: result.artist.name } }));
        tracklistVar(t);
      }
    }
  });
  const artist = data && data.artist;
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
    //console.log('getLeft');
    return menuRef.current && menuRef.current.children[activeIndex].offsetLeft;
  }

  return <>
      <Helmet>
         <title>{ data && artist.name + ' – listen online' }</title>
      </Helmet>

      { isDesktop && <div className="artist">

      <img className="bg" src={backgroundUrl} srcSet={backgroundUrl2x} alt="background"/>
      <div className="bg bg-gradient"/>
      <div className="shadow"></div>

      <Search/>

      {data && <SaveButton artist={ artist }/>}

      <h1>{data && artist.name}</h1>

      <div ref={ menuRef } className="artist__menu">
        <NavLink to={'/artist/' + id + '/albums'} onClick={onNavClick}>Albums</NavLink>
        <NavLink to={'/artist/' + id + '/about'} onClick={onNavClick}>About</NavLink>
        <NavLink to={'/artist/' + id + '/related'} onClick={onNavClick}>Related artists</NavLink>
        <hr style={{ width: getWidth(), marginLeft: getLeft() }}/>
      </div>

      <div className="artist__tracks">
        <div className="tracks__title">Random selection</div>
        {tracks && tracks.map((track) => <Track key={track.id} track={track} tracks={tracks}/>)}
      </div>

      <Switch>
        <Route path="/artist/:id/about">
        <p className="artist__about">{data && artist.description}</p>
        </Route>
        <Route path="/artist/:id/related"><p className="artist__about">Nothing here yet</p></Route>
        <Route>
          <div className="artist__albums">
            {data && artist.albums.map((album) => <ArtistAlbum key={album.id} album={album}/>)}
          </div>
        </Route>
      </Switch>

    </div> }

  { isMobile &&
      <>
        <ArtistImage id={ data && artist.id } />
        <h3>Artist</h3>
        <h1>{data && artist.name}</h1>
        { children }
        <h2>Popular tracks</h2>
        {tracks && tracks.map((track) => <Track key={track.id} track={track} tracks={tracks}/>)}
        <h2>Popular albums</h2>
        <div className="artist__albums_mobile">
          {data && artist.albums.map((album) => <ArtistAlbum key={album.id} album={album}/>)}
        </div>
      </>
  }
  </>
}

export default Artist;