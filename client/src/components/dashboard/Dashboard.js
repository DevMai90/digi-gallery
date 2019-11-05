import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import DashboardButtons from './DashboardButtons';
import DashboardTable from './DashboardTable';
import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';
import { getUserPosts } from '../../actions/post';

const Dashboard = ({ auth: { loading, user }, posts, getUserPosts }) => {
  useEffect(() => {
    user && getUserPosts(user._id);
  }, [getUserPosts, user]);

  return loading && !user ? (
    <Spinner />
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 px-0">
          <Sidebar user={user} />
        </div>

        <div className="col-lg-9">
          <DashboardButtons />
          <DashboardTable posts={posts} />
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
  auth: state.auth,
  posts: state.post.posts
});

export default connect(
  mapStateToProps,
  { getUserPosts }
)(Dashboard);
