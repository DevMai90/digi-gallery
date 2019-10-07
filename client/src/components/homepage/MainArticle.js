import React from 'react';
import PropTypes from 'prop-types';

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
    <div className="row">
      <img src={image} alt="" />
      <h1>Main Article</h1>
      {console.log(post)}
    </div>
  );
};

export default MainArticle;
