import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  // Local state
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

  // Destructure
  const { login, password } = formData;

  // Manage State
  const onChange = e => {
    // Copy existing state, then update specific properties
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div id="login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto py-3">
            <div className="card">
              <h3 className="pt-3 text-center">Sign In</h3>
              <p className="text-center">Create, Share, &amp; Repeat</p>

              <div className="container">
                <form className="m-3">
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
                      type="text"
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

export default Login;
