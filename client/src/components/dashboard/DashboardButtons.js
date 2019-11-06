import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import style from './DashboardButtons.module.css';

const DashboardButtons = ({ user: { _id } }) => {
  return (
    <div className="row">
      <div className="col-md-3">
        <Link to="/add-post" className={style['button']}>
          Add New Post
        </Link>
      </div>
      {/* <div className="col-md-3">
        <Link to="/posts" className={style['button']}>
          View Posts
        </Link>
      </div> */}
      <div className="col-md-3">
        <Link to={`/contributors/${_id}`} className={style['button']}>
          View Profile
        </Link>
      </div>
    </div>
  );
};

DashboardButtons.propTypes = {
  user: PropTypes.object.isRequired
};

export default DashboardButtons;
