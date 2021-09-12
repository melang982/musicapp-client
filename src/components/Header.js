import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userVar } from '../cache';
import { useQuery, useMutation, gql, useReactiveVar } from '@apollo/client';

function Header() {

  const CHECK_IF_LOGGED_IN = gql `
    query checkLoggedIn {
      user {
        id
        name
    }
    }
  `;

  const LOGOUT_MUTATION = gql`
    mutation logout {
      logout
    }
  `;

  //console.log('Header mounted');

  const user = useReactiveVar(userVar);
  //console.log(user);

  useQuery(CHECK_IF_LOGGED_IN, {
    skip: user.name || user.isLoggedOut,
    onCompleted: data => {
      if (data && data.user) {
        console.log('we are logged in');
        userVar({ name: data.user.name, isLoggedOut: false });
      }
    }
  });

  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: ({ logout }) => {
      if (logout === 'success') {
        console.log('logout success');
        userVar({ name: null, isLoggedOut: true });
      }
    }
  });

  return <div className='header'>
    { user.name ?
      <div className="user">
        { user.name }
        <img className="avatar" src="/user.svg" alt="avatar"/>
        <button onClick={logout}>Logout</button>
      </div> :
      <div className="links_login">
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>
    }
  </div>;
}
export default Header;