import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ContributorsNotFound from './ContributorsNotFound';
import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';

const Contributors = ({ users: { users, loading }, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
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
      {loading && !users.length ? (
        <Spinner />
      ) : !users.length ? (
        <ContributorsNotFound />
      ) : (
        <h3>asdadafas</h3>
      )}
    </div>
  );
};

Contributors.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Contributors);
