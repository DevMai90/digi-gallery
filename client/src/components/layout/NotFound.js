import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div id="notFound">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center mx-auto py-3">
            <h3>Oops... the page you're looking for cannot be found</h3>
            <p>
              Please try your request again. If you continue to have problems
              then <Link to="/contact">contact us</Link> and tell use about your
              issue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
