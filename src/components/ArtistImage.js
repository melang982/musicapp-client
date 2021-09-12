function ArtistImage({ id }) {

  const artistImgUrl = id && '/images/artist/' + id + '.png';
  //const artistImgUrl2x = id && '/images/artist/400_' + id + '.jpg 2x';

  return <img className="artist-image" src={artistImgUrl}  alt="Artist"/> //srcSet={artistImgUrl2x}
}

export default ArtistImage;