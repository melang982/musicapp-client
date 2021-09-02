import {useState} from 'react';
import {useLazyQuery, gql} from '@apollo/client';
import {NavLink} from 'react-router-dom';
import Icon from './Icon';

function Search() {
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
      }
    }
  `;

  const [searchString, setSearchString] = useState(null);
  const [executeSearch, {
      data
    }
  ] = useLazyQuery(SEARCH_QUERY);

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

  return <div className="search">
    <Icon icon='search'/>

    <input type="text" placeholder="Type here to search" onInput={(e) => onSearch(e.target.value)}/>
    <div className="search__results">
      {
        searchString && data && data.artists.map((artist) => <NavLink to={'/artist/' + artist.id} key={artist.id}>
          {artist.name}
        </NavLink>)
      }
      {
        searchString && data && data.albums.map((album) => (<p key={album.id}>
          {album.title}
        </p>))
      }
    </div>
  </div>;

}
export default Search;
