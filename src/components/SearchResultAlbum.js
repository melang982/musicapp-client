import { Link } from 'react-router-dom';
import AlbumCover from './AlbumCover';

function SearchResultAlbum({ album }) {

  return <Link to={'/album/' + album.id} className="search__album">
          <AlbumCover id={album.id} />
          {album.title}
        </Link>;
}
export default SearchResultAlbum;