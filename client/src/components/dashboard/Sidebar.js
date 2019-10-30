import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ user }) => {
  const { avatar, firstName, lastName, handle } = user;
  return (
    <div className="text-center">
      <div className="card">Avatar</div>
      <div className="card">{handle ? handle : `${firstName} ${lastName}`}</div>
      <div className="card">View Posts</div>
      <div className="card">View Profile</div>
      <div className="card">Settings</div>
      <div className="card">Collapse Sidebar?</div>
    </div>
  );
};

export default Sidebar;
