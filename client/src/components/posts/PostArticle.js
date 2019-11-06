import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const PostArticle = ({ post }) => {
  const {
    views,
    _id,
    title,
    category,
    postText,
    firstName,
    lastName,
    handle,
    image,
    likes,
    comments,
    date
  } = post;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 mx-auto text-center mt-3">
          <h1>{title}</h1>
          <p>{category.toUpperCase()}</p>
          <p>By: {handle ? handle : `${firstName} ${lastName}`}</p>
          <span className="text-muted">
            <Moment format="MMMM Do YYYY">{date}</Moment> /{' '}
            <i className="far fa-eye text-dark"></i> {views} /{' '}
            <i className="fas fa-comments text-success"></i> {comments.length} /{' '}
            <i className="fas fa-thumbs-up text-primary"></i> {likes.length}
          </span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-9 mx-auto">
          <img src={image} alt="" className="img-fluid my-3" />
          <p>{postText}</p>
        </div>
      </div>
    </div>
  );
};

PostArticle.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostArticle;
