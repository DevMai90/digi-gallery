import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import style from './styles.module.css';

const SecondaryArticles = ({ post }) => {
  const secondary = post.map((item, index) => {
    const { image, category, date, title, comments, likes } = item;

    return (
      <div key={index} className="col-md-6">
        <div className="p-3">
          <img src={image} alt="" className={`${style.secondary} mb-2`} />
          <span className="d-block text-danger">{category.toUpperCase()}</span>
          <h2>{title}</h2>
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
  post: PropTypes.object.isRequired
};

export default SecondaryArticles;
