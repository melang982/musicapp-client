function AlbumCover({ track }) {

  const albumCoverUrl = track && '/images/album/' + track.album.id + '.jpg';

  return <img className="album-cover" src={albumCoverUrl} alt="Album cover"/>
}

export default AlbumCover;