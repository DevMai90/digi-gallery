import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import style from './Home.module.css';

const TertiaryArticles = ({ post }) => {
  const tertiary = post.map((item, index) => {
    const { _id, image, category, date, title, comments, likes } = item;

    return (
      <div key={index} className="col-md-4 my-2">
        <div className="p-3">
          <Link to={`/posts/${_id}`} className={style['link']}>
            <img
              src={image}
              alt=""
              className={`${style['tertiary-img']} mb-2`}
            />
          </Link>
          <span className="d-block text-danger">{category.toUpperCase()}</span>
          <Link to={`/posts/${_id}`} className={style['link']}>
            <h3 className={style['tertiary-title']}>{title}</h3>
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
  return <div className="row no-gutters">{tertiary}</div>;
};

TertiaryArticles.propTypes = {
  post: PropTypes.array.isRequired
};

export default TertiaryArticles;
