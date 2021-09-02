import {useState} from 'react';
import {useLazyQuery, gql} from '@apollo/client';
import Icon from './Icon';

function Search() {
  const SEARCH_QUERY = gql `
    query SearchQuery($filter: String!) {
      artists(filter: $filter) {
        id,
        name
      }
    }
  `;

  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, {
      data
    }
  ] = useLazyQuery(SEARCH_QUERY);

  return <div>
    Search
    <input type="text" onChange={(e) => setSearchFilter(e.target.value)}/>
    <button onClick={() => executeSearch({
        variables: {
          filter: searchFilter
        }
      })
}>OK</button>
    {
      data && data.artists.map((artist) => (<p key={artist.id}>
        {artist.name}
      </p>))
    }
  </div>;

}
export default Search;
