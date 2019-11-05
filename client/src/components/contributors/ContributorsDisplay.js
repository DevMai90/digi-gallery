import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import style from './ContributorsDisplay.module.css';

const ContributorsDisplay = ({ users }) => {
  const usersDisplay = users.map((user, index) => {
    const { _id, firstName, lastName, handle, date } = user;
    return (
      <tr key={_id} className={style['content']}>
        <td>
          <Link to={`/contributors/${_id}`} className={style['link']}>
            {index + 1}
          </Link>
        </td>
        <td>
          <Link to={`/contributors/${_id}`} className={style['link']}>
            {handle ? handle : `${firstName} ${lastName}`}
          </Link>
        </td>
        <td>
          <Link to={`/contributors/${_id}`} className={style['link']}>
            <Moment date={date} format="MM/DD/YYYY" />
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div className="row">
      <div className="col-md-9 mx-auto">
        <div className="table-responsive-md">
          <table
            className={`table table-hover table-light ${style['table-border']}`}
          >
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Member Since</th>
              </tr>
            </thead>
            <tbody>{usersDisplay}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

ContributorsDisplay.propTypes = {
  users: PropTypes.array.isRequired
};

export default ContributorsDisplay;
