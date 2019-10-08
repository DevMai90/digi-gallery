import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const TertiaryArticles = ({ post }) => {
  const tertiary = post.map((item, index) => {
    const { image, category, date, title, comments, likes } = item;

    return (
      <div key={index} className="col-md-4">
        <div className="p-3">
          <img src={image} alt="" className="mb-2" />
          <span className="d-block text-danger">{category.toUpperCase()}</span>
          <h3>
            <strong>{title}</strong>
          </h3>
          <span className="text-muted">
            <Moment format="MMMM Do YYYY">{date}</Moment> /{' '}
            <i className="fas fa-comments text-success"></i> {comments.length}{' '}
            <i className="fas fa-thumbs-up text-primary"></i> {likes.length}
          </span>
        </div>
      </div>
    );
  });
  return <div className="row no-gutters secondary-article">{tertiary}</div>;
};

TertiaryArticles.propTypes = {
  post: PropTypes.object.isRequired
};

export default TertiaryArticles;
