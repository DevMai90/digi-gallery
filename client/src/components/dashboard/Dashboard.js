import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import DashboardButtons from './DashboardButtons';
import DashboardTable from './DashboardTable';
import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';
import { getUserPosts } from '../../actions/post';

const Dashboard = ({ auth: { loading, user }, getUserPosts }) => {
  useEffect(() => {
    user && getUserPosts(user._id);
  }, [getUserPosts, user]);

  return loading || !user ? (
    <Spinner />
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-md-3 px-0">
          <Sidebar user={user} />
        </div>

        <div className="col-md-9">
          <DashboardButtons />
          <DashboardTable />
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserPosts }
)(Dashboard);
