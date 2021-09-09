function ArtistAlbum({ album }) {

  const albumCoverUrl = '/images/album/' + album.id + '.jpg';

  return <div className="artist__album">
    <img className="album__cover" src={albumCoverUrl} alt="album cover"/>
    <p className="album__title">{album.title}</p>
    <p>{album.year}</p>
  </div>;
}
export default ArtistAlbum;