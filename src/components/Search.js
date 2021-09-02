import {useState, useRef, useEffect} from 'react';
import {useLazyQuery, gql} from '@apollo/client';
import {withRouter} from 'react-router-dom'; //to detect route change in effect
import {NavLink} from 'react-router-dom';
import Icon from './Icon';

function Search(props) {
  const {location} = props;
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

  useEffect(() => {
    console.log('updated location');
    setSearchString(null);
  }, [location]);

  return <div className="search">
    <Icon icon='search'/>

    <input type="text" placeholder="Type here to search" onInput={(e) => onSearch(e.target.value)}/> {
      searchString && data && <div className="search__results">
          {
            data.artists.map((artist) => <NavLink to={'/artist/' + artist.id} key={artist.id}>
              {artist.name}
            </NavLink>)
          }
          {
            data.albums.map((album) => (<p key={album.id}>
              {album.title}
            </p>))
          }
        </div>
    }
  </div>;

}
export default withRouter(Search);
