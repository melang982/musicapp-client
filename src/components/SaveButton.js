import { useMutation, gql, useReactiveVar } from '@apollo/client';
import { userVar } from '../cache';
import Icon from './Icon';

function SaveButton({ artist }) {
  const user = useReactiveVar(userVar);
  //console.log(artist.id);

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

  const className = 'save' + (user.name && artist.userStars ? ' save_saved' : '');

  const label = (user.name && artist.userStars ? 'Saved' : 'Save') + ' to My stars';

  function onClick() {
    if (!user.name) {
      alert('Sign in to save artists');
      return;
    }

    if (artist.userStars) removeStar();
    else addStar();
  }

  return <button className={className} onClick={onClick}>
    <Icon icon='star'/> {label}
  </button>
}
export default SaveButton;