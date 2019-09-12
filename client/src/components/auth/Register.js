import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Alert from '../layout/Alert';

// Connects to redux store
import { connect } from 'react-redux';
// Bring in action creator
import { setAlert } from '../../actions/alert';

import validateEmailFormat from '../../utils/validateEmailFormat';

// Destructure from props
const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password1: '',
    password2: '',
    email: '',
    handle: ''
  });

  const { firstName, lastName, password1, password2, email, handle } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    // Check for empty fields
    const errors = [];
    let field;

    for (field in formData) {
      if (!formData[field] && field !== 'handle') errors.push(field);
    }

    if (errors.length > 0)
      return setAlert('Please complete all required fields', 'danger');

    // Check password length
    if (password1.length < 6)
      return setAlert('Password must be at least 6 characters long', 'danger');

    // Check if passwords match
    if (password1 !== password2)
      return setAlert('Password fields do not match', 'danger');

    // Validate email format
    if (!validateEmailFormat(email))
      return setAlert('Please enter a valid email address', 'danger');

    // Validate handle length
    if (handle && handle.length < 8)
      return setAlert('Username must be at least 8 characters long', 'danger');

    console.log(formData);
  };

  return (
    <div id="login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto py-3">
            <div className="card">
              <Alert />
              <h3 className="pt-3 text-center">Registration</h3>
              <p className="text-center">
                Please fill out the following fields
              </p>

              <div className="container">
                <form className="m-3" onSubmit={e => onSubmit(e)}>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={firstName}
                      onChange={e => onChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={lastName}
                      onChange={e => onChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password1"
                      value={password1}
                      onChange={e => onChange(e)}
                    />
                    <p className="text-muted">
                      <small>
                        * Passwords must be at least 6 characters long
                      </small>
                    </p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password2">Re-enter Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password2"
                      value={password2}
                      onChange={e => onChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={e => onChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="handle">Username (optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="handle"
                      value={handle}
                      onChange={e => onChange(e)}
                    />
                    <p className="text-muted">
                      <small>
                        * Optional usernames must be at least 8 characters long
                      </small>
                    </p>
                  </div>

                  <button className="btn btn-primary btn-block py-2">
                    <i className="fas fa-arrow-circle-right mr-1" /> Create
                    Account
                  </button>
                </form>

                <hr />
                <p className="text-center">
                  Already registered? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  // Matching dispatch to props. Allows us to use action creators
  { setAlert }
)(Register);
