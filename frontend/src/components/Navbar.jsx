import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink to="/" end>
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/resources">Other Resources</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
