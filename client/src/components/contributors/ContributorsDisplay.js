import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import style from './ContributorsDisplay.module.css';

const ContributorsDisplay = ({ users }) => {
  const usersDisplay = users.map((user, index) => {
    const { _id, firstName, lastName, handle, date } = user;
    return (
      <tr key={_id} className={style['content']}>
        <td>{index + 1}</td>
        <td>{handle ? handle : `${firstName} ${lastName}`}</td>
        <td>
          <Moment date={date} format="MM/DD/YYYY" />
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
