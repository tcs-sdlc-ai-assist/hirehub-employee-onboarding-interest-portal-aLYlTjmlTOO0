import { NavLink, useNavigate } from 'react-router-dom';
import { isAdminAuthenticated, logoutAdmin } from '../utils/session.js';

export default function Header() {
  const navigate = useNavigate();
  const authenticated = isAdminAuthenticated();

  function handleLogout() {
    logoutAdmin();
    navigate('/');
  }

  return (
    <header className="header">
      <div className="container">
        <NavLink to="/" className="header-logo">
          Hire<span>Hub</span>
        </NavLink>
        <nav className="header-nav open">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/apply"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Apply
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Admin
          </NavLink>
          {authenticated ? (
            <button className="btn-nav" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/admin" className="btn-nav">
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}