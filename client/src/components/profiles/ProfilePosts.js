import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import style from './ProfilePosts.module.css';

const ProfilePosts = ({ post }) => {
  const { posts, loading } = post;

  const postsDisplay = posts.map((post, index) => {
    const { _id, title, category, views, date } = post;
    return (
      <tr key={_id}>
        <td>
          <Link to={`/posts/${_id}`} className={style['link']}>
            {index + 1}
          </Link>
        </td>
        <td>
          <Link to={`/posts/${_id}`} className={style['link']}>
            {title}
          </Link>
        </td>
        <td>
          <Link to={`/posts/${_id}`} className={style['link']}>
            {category}
          </Link>
        </td>
        <td>
          <Link to={`/posts/${_id}`} className={style['link']}>
            {views}
          </Link>
        </td>
        <td>
          <Link to={`/posts/${_id}`} className={style['link']}>
            <Moment date={date} format="MM/DD/YYYY" />
          </Link>
        </td>
      </tr>
    );
  });

  return (
    !loading &&
    !!posts.length && (
      <div className="row">
        <div className="col-md-9 mx-auto">
          <div className="table-responsive-md">
            <table
              className={`table table-hover table-light ${
                style['table-border']
              }`}
              // className="table table-hover table-light"
            >
              <thead className="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Views</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>{postsDisplay}</tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
};

ProfilePosts.propTypes = {
  post: PropTypes.object.isRequired
};

export default ProfilePosts;
