import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileDisplay from './ProfileDisplay';
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
    </Fragment>
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
