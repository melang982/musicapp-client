import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

function Header() {

  const authToken = localStorage.getItem(AUTH_TOKEN);
  console.log(authToken);

  return <div className='header'>
    { authToken ?
      <div className="user">
        Andrew Z
        <img className="avatar" src="/user.svg" alt="avatar"/>
      </div> :
      <div className="links_login">
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>
    }
  </div>;
}
export default Header;