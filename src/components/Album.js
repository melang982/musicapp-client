function Album({album}) {

  const albumCoverUrl = '/images/album/' + album.id + '.jpg';

  return <div className="album">
    <img className="album__cover" src={albumCoverUrl} alt="album cover"/>
    <p className="album__title">{album.title}</p>
    <p>{album.year}</p>
  </div>;
}
export default Album;
