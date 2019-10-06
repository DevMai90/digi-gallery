import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Alert from '../layout/Alert';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Login = ({ loginUser, alert, setAlert, auth: { isAuthenticated } }) => {
  // Local state
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

  // use local state to see how many articles we've downloaded?

  // Destructure
  const { login, password } = formData;

  // Manage State
  const onChange = e => {
    // Copy existing state, then update specific properties
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const onSubmit = e => {
    e.preventDefault();

    // Frontend input validation
    if (!login)
      return setAlert(
        'Please enter a registered email address or username',
        'danger'
      );

    if (!password) return setAlert('Please enter a valid password', 'danger');

    loginUser(login, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div id="authenticate">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto py-3">
            <div className="card">
              {alert && <Alert />}
              <h3 className="pt-3 text-center">Sign In</h3>
              <p className="text-center">Create, Share, &amp; Repeat</p>

              <div className="container">
                <form
                  className="m-3"
                  spellCheck="false"
                  onSubmit={e => onSubmit(e)}
                >
                  <div className="form-group">
                    <label htmlFor="login">Email or Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="login"
                      value={login}
                      onChange={e => onChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={e => onChange(e)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block py-2"
                  >
                    <i className="fas fa-arrow-circle-right mr-1" /> Sign In
                  </button>
                </form>

                <hr />
                <p className="text-center">
                  New to Digi-Gallery?{' '}
                  <Link to="/register">Create an account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  alert: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser, setAlert }
)(Login);
