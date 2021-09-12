import { Link } from 'react-router-dom';
import AlbumCover from './AlbumCover';

function SearchResultTrack({ track }) {

  return <Link to={'/album/' + track.album.id} className="search__track">
          <AlbumCover id={track.album.id} />
          {track.title}
        </Link>;
}
export default SearchResultTrack;