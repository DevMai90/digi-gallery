import React from 'react';
import { Link } from 'react-router-dom';

import style from './DashboardButtons.module.css';

const DashboardButtons = () => {
  return (
    <div className="row my-2">
      <div className="col-md-3">
        <Link to="/add-post" className={style['button']}>
          Add New Post
        </Link>
      </div>
      <div className="col-md-3">
        <Link to="/posts" className={style['button']}>
          View Posts
        </Link>
      </div>
      <div className="col-md-3">
        <Link to="/profile" className={style['button']}>
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default DashboardButtons;
