import { Link } from 'react-router-dom';
import ArtistImage from './ArtistImage';

function SearchResultArtist({ artist }) {

  return <Link to={'/artist/' + artist.id} className="search__artist">
          <ArtistImage id={ artist.id } />
          { artist.name }
        </Link>;
}
export default SearchResultArtist;