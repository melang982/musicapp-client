function PlaylistImage({ id }) {

  const imageUrl = id && '/images/playlist/' + id + '.jpg';
  const imageUrl2x = id && '/images/playlist/' + id + '.jpg 2x';

  return <img src={imageUrl} srcSet={imageUrl2x} alt="Album cover"/>
}

export default PlaylistImage;