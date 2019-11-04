import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';

const Contributors = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center m-auto">
          <header>
            <h1>Contributors</h1>
            <hr />
          </header>
        </div>
      </div>
    </div>
  );
};

Contributors.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Contributors);
