import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import style from './Home.module.css';

const SecondaryArticles = ({ post }) => {
  const secondary = post.map((item, index) => {
    const { _id, image, category, date, title, comments, likes } = item;

    return (
      <div key={index} className="col-md-6">
        <div className="p-3">
          <Link to={`/posts/${_id}`} className={style['link']}>
            <img
              src={image}
              alt=""
              className={`${style['secondary-img']} mb-2`}
            />
          </Link>
          <span className="d-block text-danger">{category.toUpperCase()}</span>
          <Link to={`/posts/${_id}`} className={style['link']}>
            <h2 className={style['secondary-title']}>{title}</h2>
          </Link>
          <span className="text-muted">
            <Moment format="MMMM Do YYYY">{date}</Moment> /{' '}
            <i className="fas fa-comments text-success"></i> {comments.length}{' '}
            <i className="fas fa-thumbs-up text-primary"></i> {likes.length}
          </span>
        </div>
      </div>
    );
  });
  return <div className="row no-gutters">{secondary}</div>;
};

SecondaryArticles.propTypes = {
  post: PropTypes.array.isRequired
};

export default SecondaryArticles;
