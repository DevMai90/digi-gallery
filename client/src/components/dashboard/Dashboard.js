import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';

const Dashboard = ({ auth: { loading, user } }) => {
  return loading || !user ? (
    <Spinner />
  ) : (
    <div>
      <div className="row">
        <div className="col-md-3">
          <Sidebar user={user} />
        </div>

        <div className="col-md-9">
          <div className="bg-primary">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
