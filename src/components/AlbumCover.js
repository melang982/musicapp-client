function AlbumCover({ id, className }) {

  const albumCoverUrl = id && '/images/album/200_' + id + '.jpg';
  const albumCoverUrl2x = id && '/images/album/400_' + id + '.jpg 2x';

  return <img className={"album-cover " + className} src={albumCoverUrl} srcSet={albumCoverUrl2x} alt="Album cover"/>
}

export default AlbumCover;