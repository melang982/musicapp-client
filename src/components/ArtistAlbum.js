import { Link } from 'react-router-dom';

function ArtistAlbum({ album }) {

  const albumCoverUrl = '/images/album/' + album.id + '.jpg';

  return <Link to={'/album/' + album.id} className="artist__album">
    <img className="album__cover" src={albumCoverUrl} alt="album cover"/>
    <p className="album__title">{album.title}</p>
    <p>{album.year}</p>
  </Link>;
}
export default ArtistAlbum;