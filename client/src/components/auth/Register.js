import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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
  return (
    <div id="login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto py-3">
            <div className="card">
              <h3 className="pt-3 text-center">Registration</h3>
              <p className="text-center">
                Please fill out the following fields
              </p>

              <div className="container">
                <form className="m-3">
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
                      type="email"
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
                        * If username is not provided then full name is
                        displayed on posts
                      </small>
                    </p>
                  </div>

                  <button className="btn btn-primary btn-block py-2">
                    <i className="fas fa-arrow-circle-right mr-1" /> Sign In
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

export default Register;
