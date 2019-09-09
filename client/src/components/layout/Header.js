import React from 'react';

const Header = () => {
  return (
    <div className="container">
      <h3 className="mt-2">
        <a href="#" className="text-white">
          Digi-Gallery
        </a>
      </h3>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* <a href="#" className="navbar-brand" style={{ fontSize: '1.5rem' }}>
          <strong>Digi-Gallery</strong>
        </a> */}
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item pr-1 active">
              <a href="#" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item px-1 dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
              >
                Categories
              </a>
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">
                  Automotive
                </a>
                <a href="#" className="dropdown-item">
                  Photography
                </a>
                <a href="#" className="dropdown-item">
                  Nature
                </a>
                <a href="#" className="dropdown-item">
                  Daily
                </a>
                <a href="#" className="dropdown-item">
                  Lifestyle
                </a>
                <a href="#" className="dropdown-item">
                  Random
                </a>
                <a href="#" className="dropdown-item">
                  Art
                </a>
                <a href="#" className="dropdown-item">
                  People
                </a>
                <a href="#" className="dropdown-item">
                  Other
                </a>
              </div>
            </li>
            <li className="nav-item px-1">
              <a href="#" className="nav-link">
                Contributor List
              </a>
            </li>
            <li className="nav-item px-1">
              <a href="#" className="nav-link">
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
