function AlbumCover({ id }) {

  const albumCoverUrl = id && '/images/album/200_' + id + '.jpg';
  const albumCoverUrl2x = id && '/images/album/400_' + id + '.jpg 2x';

  return <img className="album-cover" src={albumCoverUrl} srcset={albumCoverUrl2x} alt="Album cover"/>
}

export default AlbumCover;