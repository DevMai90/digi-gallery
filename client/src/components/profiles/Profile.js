import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileDisplay from './ProfileDisplay';
import ProfilePosts from './ProfilePosts';
import NotFound from '../layout/NotFound';
import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';
import { getProfile } from '../../actions/users';
import { getUserPosts } from '../../actions/post';

const Profile = ({
  users: { profile, loading },
  post,
  getProfile,
  getUserPosts,
  match
}) => {
  // How many useEffect in component?
  useEffect(() => {
    getProfile(match.params.id);
  }, [getProfile, match.params.id]);

  useEffect(() => {
    getUserPosts(match.params.id);
  }, [getUserPosts, match.params.id]);

  return loading && !profile ? (
    <Spinner />
  ) : !profile ? (
    <NotFound />
  ) : (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center m-auto">
            <header>
              <h1>Contributor</h1>
              <hr />
            </header>
          </div>
        </div>
      </div>

      <ProfileDisplay profile={profile} />
      <ProfilePosts post={post} />
    </Fragment>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getProfile, getUserPosts }
)(Profile);
