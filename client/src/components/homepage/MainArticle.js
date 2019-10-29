import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import style from './styles.module.css';

const MainArticle = ({ post }) => {
  const { image, category, date, title, comments, likes } = post;
  return (
    <div className="row no-gutters">
      <img className={style['main-img']} src={image} alt="" />
      <span className="mx-auto text-danger d-block">
        {category.toUpperCase()}
      </span>
      <div className="col-md-12 text-center p-2">
        <h1 className={style['main-title']}>{title}</h1>
        <span className="text-muted">
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

MainArticle.propTypes = {
  post: PropTypes.object.isRequired
};

export default MainArticle;
