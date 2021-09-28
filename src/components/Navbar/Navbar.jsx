import "./navbar.scss";
import { Link, NavLink, withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../Logo/Logo";

const Header = ({ setTheme, location }) => {
  const [themeChecked, setThemeChecked] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const handleThemeChange = () => {
    setThemeChecked(!themeChecked);
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const { pathname } = location;
    setCurrentPath(pathname);
  }, [location]);

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="navbar__rightContent">
        <nav className="navbar__menu">
          <ul>
            <li>
              <NavLink exact to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-trending-up"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                <span>Trending</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/movies/1/all`} isActive={() => currentPath.split("/")[1] === "movies"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-trending-up"
                >
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                  <line x1="7" y1="2" x2="7" y2="22"></line>
                  <line x1="17" y1="2" x2="17" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <line x1="2" y1="7" x2="7" y2="7"></line>
                  <line x1="2" y1="17" x2="7" y2="17"></line>
                  <line x1="17" y1="17" x2="22" y2="17"></line>
                  <line x1="17" y1="7" x2="22" y2="7"></line>
                </svg>

                <span>Movies</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/tv/1/all`} isActive={() => currentPath.split("/")[1] === "tv"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-trending-up"
                >
                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                  <polyline points="17 2 12 7 7 2"></polyline>
                </svg>
                <span>TV Series</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-trending-up"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>Search</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="navbar__themeToggle">
          <input
            type="checkbox"
            id="themeToggleBtn"
            className="navbar__themeToggleCheckbox"
            value="0"
            checked={themeChecked}
            onChange={handleThemeChange}
          />
          <label htmlFor="themeToggleBtn"></label>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
