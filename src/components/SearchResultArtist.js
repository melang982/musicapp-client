import { Link } from 'react-router-dom';

function SearchResultArtist({ artist }) {

  const backgroundUrl = '/images/artist/' + artist.id + '.png';

  return <Link to={'/artist/' + artist.id} className="search__artist">
          <img  src={backgroundUrl} alt="artist"/>
          {artist.name}
        </Link>;
}
export default SearchResultArtist;