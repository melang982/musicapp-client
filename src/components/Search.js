import { useState, useRef, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { withRouter, Link } from 'react-router-dom';
import Icon from './Icon';
import SearchResultArtist from './SearchResultArtist';
import SearchResultAlbum from './SearchResultAlbum';
import SearchResultTrack from './SearchResultTrack';
import '../styles/search.scss';

function Search({ location }) {

  //const wrapperRef = useRef(null);
  //useOutsideAlerter(wrapperRef);

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

  const [searchString, setSearchString] = useState(null);
  const [executeSearch, { data }] = useLazyQuery(SEARCH_QUERY);

  function onSearch(str) {
    if (str) {
      executeSearch({
        variables: {
          filter: str
        }
      })
    };

    setSearchString(str);
  };

  useEffect(() => {
    console.log('updated location');
    setSearchString(null);
  }, [location]);

  return <div className="search">
    <Icon icon='search'/>

    <input type="text" placeholder="Type here to search" onInput={(e) => onSearch(e.target.value)}/> {
      searchString && data && <div className="search__results">
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