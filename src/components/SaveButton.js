import { useMutation, gql } from '@apollo/client';
import Icon from './Icon';

function SaveButton({ artist }) {
  //console.log(artist.id);

  const ADD_STAR_MUTATION = gql `
    mutation {
      addStar(id:${artist.id})
    }
  `;

  const [addStar] = useMutation(ADD_STAR_MUTATION, {
    update: (cache, mutationResult) => {
      //console.log(mutationResult);

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

  const className = 'save' + (artist.userStars ? ' save_saved' : '');

  const label = (artist.userStars ? 'Saved' : 'Save') + ' to My stars';

  return <button className={className} onClick={addStar}>
    <Icon icon='star'/> {label}
  </button>
}
export default SaveButton;