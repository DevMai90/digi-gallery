import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Header = ({ auth: { loading, isAuthenticated }, logout }) => {
  // Need links for users that are logged in or not
  const authLinks = (
    <Fragment>
      <li className="nav-item px-1">
        <NavLink to="/dashboard" className="nav-link">
          Dashboard
        </NavLink>
      </li>
      <li className="nav-item px-1">
        <Link to="/login" className="nav-link" onClick={e => logout()}>
          Logout
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item px-1">
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      </li>
      <li className="nav-item px-1">
        <NavLink to="/register" className="nav-link">
          Register
        </NavLink>
      </li>
    </Fragment>
  );
  return (
    <div>
      <section id="header-logo" className="text-white p-3">
        <Link to="/" className="text-white">
          <h3 className="mb-0">Digi-Gallery</h3>
          <small>Create, Share, &amp; Repeat</small>
        </Link>
      </section>

      <nav className="navbar navbar-expand-md navbar-dark">
        <button
          className="navbar-toggler ml-auto"
          data-toggle="collapse"
          data-target="navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item px-1">
              <NavLink exact to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item px-1 dropdown">
              <NavLink
                to="/categories"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
              >
                Categories
              </NavLink>
              <div className="dropdown-menu">
                <Link to="/categories/all" className="dropdown-item">
                  All
                </Link>
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
            {/* <li className="nav-item px-1">
              <NavLink to="/posts" className="nav-link">
                Posts
              </NavLink>
            </li> */}
            <li className="nav-item px-1">
              <NavLink to="/contributors" className="nav-link">
                Contributors
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
