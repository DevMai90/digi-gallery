import React from 'react';
import PropTypes from 'prop-types';

import style from './Sidebar.module.css';

const Sidebar = ({ user }) => {
  const { avatar, firstName, lastName, handle } = user;
  return (
    <div className={`text-center ${style['content']}`}>
      <div className="p-2">
        <img src={avatar} alt="" className={` ${style['round']}`} />
        <div>{handle ? handle : `${firstName} ${lastName}`}</div>
      </div>
      <div className="p-2">View Posts</div>
      <div className="p-2">View Profile</div>
      <div className="p-2">Settings</div>
    </div>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object.isRequired
};

export default Sidebar;
