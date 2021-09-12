import { useMutation, gql } from '@apollo/client';
import Icon from './Icon';

function SaveButton({ artist }) {
  console.log(artist.id);

  const ADD_STAR_MUTATION = gql `
    mutation AddStar {
      addStar(id:${artist.id})
    }
  `;

  const REMOVE_STAR_MUTATION = gql `
    mutation RemoveStar {
      removeStar(id:${artist.id})
    }
  `;

  const [addStar] = useMutation(ADD_STAR_MUTATION, {
    update: (cache, mutationResult) => {
      cache.writeQuery({
        query: gql`
          query WriteArtist($id: Int!) {
            artist(id: $id) {
              userStars
            }
          }`,
        variables: { id: artist.id },
        data: {
          artist: {
            userStars: true
          }
        }
      });
    }
  });

  const [removeStar] = useMutation(REMOVE_STAR_MUTATION, {
    update: (cache, mutationResult) => {
      cache.writeQuery({
        query: gql`
          query WriteArtist($id: Int!) {
            artist(id: $id) {
              userStars
            }
          }`,
        variables: { id: artist.id },
        data: {
          artist: {
            userStars: false
          }
        }
      });
    }
  });

  const className = 'save' + (artist.userStars ? ' save_saved' : '');

  const label = (artist.userStars ? 'Saved' : 'Save') + ' to My stars';

  return <button className={className} onClick={artist.userStars ? removeStar : addStar}>
    <Icon icon='star'/> {label}
  </button>
}
export default SaveButton;