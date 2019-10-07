import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const MainArticle = ({ post, loading }) => {
  const {
    image,
    category,
    date,
    firstName,
    lastName,
    handle,
    title,
    comments,
    likes
  } = post;
  return (
    <div className="row no-gutters main-article">
      <img src={image} alt="" />
      <span className="mx-auto text-danger d-block">
        {category.toUpperCase()}
      </span>
      <div className="col-md-12 text-center p-2">
        <h1>
          <strong>{title}</strong>
        </h1>
        <span>
          <strong>{handle ? handle : `${firstName} ${lastName}`}</strong>/{' '}
          <Moment format="MMMM Do YYYY">{date}</Moment> /{' '}
          <i className="fas fa-comments text-success"></i> {comments.length} /{' '}
          <i className="fas fa-thumbs-up text-primary"></i> {likes.length}
        </span>
      </div>
      <div className="col-md-12">
        <hr className="m-3" />
      </div>
    </div>
  );
};

export default MainArticle;
