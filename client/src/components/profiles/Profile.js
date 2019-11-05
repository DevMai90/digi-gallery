import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NotFound from '../layout/NotFound';
import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';
import { getProfile } from '../../actions/users';

const Profile = ({ getProfile, users: { profile, loading }, match }) => {
  useEffect(() => {
    getProfile(match.params.id);
  }, [getProfile, match.params.id]);
  return loading && !profile ? (
    <Spinner />
  ) : !profile ? (
    <NotFound />
  ) : (
    <div>
      <h3>TODO</h3>
    </div>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Profile);
