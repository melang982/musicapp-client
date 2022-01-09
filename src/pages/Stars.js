import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { Link } from 'react-router-dom';
import { userVar } from '../cache';
import ArtistImage from '../components/ArtistImage';

const USER_STARS_QUERY = gql `
  query getUserStars {
    user {
      id
      stars {
        id
        name
      }
    }
  }
`;

function Stars() {
  const user = useReactiveVar(userVar);

  const { data } = useQuery(USER_STARS_QUERY, { skip: !user.name });
  //console.log(data);
  const stars = data && data.user.stars;

  return <div className="stars">
    <h1>My stars</h1>
    {!user.name && 'Sign in to see your artists'}
    { stars && <div className = "stars__grid">
    {stars.map((artist) => <Link to={'/artist/' + artist.id} key={artist.id}>
      <ArtistImage id={ artist.id } />
      { artist.name }
    </Link>)}
      </div>}
  </div>;
}
export default Stars;