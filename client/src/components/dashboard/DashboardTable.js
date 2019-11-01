import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import style from './DashboardTable.module.css';

const DashboardTable = ({ posts }) => {
  const postsDisplay = posts.map((post, index) => {
    const { _id, title, category, date, likes, views, comments } = post;
    return (
      <tr key={_id} className={style['content']}>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{category}</td>
        <td>
          <Moment date={date} format="MM/DD/YYYY" />
        </td>
        <td>{likes.length}</td>
        <td>{views}</td>
        <td>{comments.length}</td>
      </tr>
    );
  });
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive-md">
          <table
            className={`table table-hover table-light ${style['table-border']}`}
          >
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Date</th>
                <th scope="col">Likes</th>
                <th scope="col">Views</th>
                <th scope="col">Comments</th>
              </tr>
            </thead>
            <tbody>{postsDisplay}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

DashboardTable.propTypes = {
  posts: PropTypes.array.isRequired
};

export default DashboardTable;
