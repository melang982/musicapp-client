import { Link } from 'react-router-dom';
import AlbumCover from './AlbumCover';

function ArtistAlbum({ album }) {

  return <Link to={'/album/' + album.id} className="artist__album">
    <AlbumCover id={album.id} />
    <p className="album__title">{album.title}</p>
    <p className="album__year">{album.year}</p>
  </Link>;
}
export default ArtistAlbum;