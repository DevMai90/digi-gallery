import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <h3 className="mb-0 p-3" id="header-logo">
        <Link to="/" className="text-white">
          Digi-Gallery
        </Link>
      </h3>

      <nav className="navbar navbar-expand-lg navbar-dark">
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item px-1 active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item px-1 dropdown">
              <Link
                to="/"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
              >
                Categories
              </Link>
              <div className="dropdown-menu">
                <Link to="/categories/automotive" className="dropdown-item">
                  Automotive
                </Link>
                <Link to="/categories/photography" className="dropdown-item">
                  Photography
                </Link>
                <Link to="/categories/nature" className="dropdown-item">
                  Nature
                </Link>
                <Link to="/categories/daily" className="dropdown-item">
                  Daily
                </Link>
                <Link to="/categories/lifestyle" className="dropdown-item">
                  Lifestyle
                </Link>
                <Link to="/categories/animals" className="dropdown-item">
                  Animals
                </Link>
                <Link to="/categories/art" className="dropdown-item">
                  Art
                </Link>
                <Link to="/categories/people" className="dropdown-item">
                  People
                </Link>
                <Link to="/categories/other" className="dropdown-item">
                  Other
                </Link>
              </div>
            </li>
            <li className="nav-item px-1">
              <Link to="/contributors" className="nav-link">
                Contributor List
              </Link>
            </li>
            {/* <li className="nav-item px-1">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li> */}
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item px-1">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item px-1">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
