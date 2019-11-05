import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';

const Profile = ({ match }) => {
  return (
    <div>
      <h3>{match.params.id}</h3>
    </div>
  );
};

Profile.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Profile);
