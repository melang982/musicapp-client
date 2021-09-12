import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { Link } from 'react-router-dom';
import { userVar } from '../cache';
import ArtistImage from '../components/ArtistImage';

function Stars() {
  const user = useReactiveVar(userVar);

  const USER_STARS_QUERY = gql `
    query getUserPlaylists {
      user {
        id
        stars {
          id
          name
        }
      }
    }
  `;

  const { data } = useQuery(USER_STARS_QUERY, { skip: !user.name });
  console.log(data);
  const stars = data && data.user.stars;

  return <div className="stars">
    <h1>My stars</h1>
    <div className = "stars__grid">
    { stars && stars.map((artist) => <Link to={'/artist/' + artist.id} key={artist.id}>
      <ArtistImage id={ artist.id } />
      { artist.name }
    </Link>)}
      </div>
  </div>;
}
export default Stars;