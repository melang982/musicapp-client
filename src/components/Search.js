import { useState, useRef, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import Icon from './Icon';
import SearchResultArtist from './SearchResultArtist';
import SearchResultAlbum from './SearchResultAlbum';
import SearchResultTrack from './SearchResultTrack';
import '../styles/search.scss';

const SEARCH_QUERY = gql `
  query SearchQuery($filter: String!) {
    artists(filter: $filter) {
      id
      name
    }
    albums(filter: $filter) {
      id
      title
    }
    tracks(filter: $filter) {
      id
      title
      album {
        id
      }
    }
  }
`;

function Search({ location }) {

  const [searchString, setSearchString] = useState('');
  const [executeSearch, { data }] = useLazyQuery(SEARCH_QUERY);

  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSearchString('');
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  useEffect(() => {
    //console.log('updated location');
    setSearchString('');
  }, [location]);

  function onSearch(str) {
    if (str) {
      executeSearch({
        variables: {
          filter: str
        }
      })
    };

    setIsVisible(true);
    setSearchString(str);
  };

  return <div ref={wrapperRef} className="search">
    <Icon icon='search'/>

    <input type="text" value={searchString} placeholder="Type here to search" onInput={(e) => onSearch(e.target.value)}/> {
      isVisible && searchString && data && <div className="search__results">
          { data.artists.length > 0 && <h5>Artists</h5> }
          {
            data.artists.map((artist) => <SearchResultArtist key={artist.id} artist={artist}/>)
          }
          { data.albums.length > 0 && <h5>Albums</h5>}
          {
            data.albums.map((album) => <SearchResultAlbum key={album.id} album={album}/>)
          }
          { data.tracks.length > 0 && <h5>Tracks</h5>}
          {
            data.tracks.map((track) => <SearchResultTrack key={track.id} track={track}/>)
          }
        </div>
    }
  </div>;

}
export default withRouter(Search);