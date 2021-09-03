import {Link} from 'react-router-dom';

function Sidebar() {

  return <div className='sidebar'>
    <img className="logo" src='/logo.png' alt="logo"/>
    <h2>Music</h2>
    <div className="sidebar__menu">
      <Link to={'/artist/2'}>Discover</Link>
      <Link to={'/artist/2'}>Rising</Link>
      <Link to={'/artist/2'}>Inspiration</Link>
      <Link to={'/artist/2'}>My stars</Link>
    </div>

    <div className="sidebar__menu">
      <Link to={'/artist/2'}>Songs</Link>
      <Link to={'/artist/2'}>Artists</Link>
      <Link to={'/artist/2'}>Albums</Link>
      <Link to={'/artist/2'}>Radio</Link>
    </div>

  </div>;
}
export default Sidebar;
