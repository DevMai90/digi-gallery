import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import style from './ProfileDisplay.module.css';

const ProfileDisplay = ({ profile }) => {
  const { avatar, firstName, lastName, handle, about, date } = profile;
  return (
    <div className="row">
      <div className="col-md-9 mx-auto text-center">
        <div className="card">
          <div className={`card-body ${style['card-color']}`}>
            <img src={avatar} alt="" className={style['round']} />
            <h2>{handle ? handle : `${firstName} ${lastName}`}</h2>
            <p>
              Member since: <Moment date={date} format="MM/DD/YYYY" />
            </p>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-9 mx-auto">
                <h3>About Me</h3>
                <p>{about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileDisplay.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileDisplay;
