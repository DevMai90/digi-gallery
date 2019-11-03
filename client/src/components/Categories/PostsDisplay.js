import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import style from './PostsDisplay.module.css';

const PostsDisplay = ({ posts }) => {
  const postsDisplay = posts.map((post, index) => {
    const { _id, title, image, firstName, lastName, handle, date } = post;

    return (
      <div key={_id} className="col-lg-4 my-2">
        <div className="p-3">
          <img src={image} alt="" className={style['img']} />
          <h3 className={style['title']}>{title}</h3>
          <span className="text-muted">
            <Moment date={date} format="MMMM Do YYYY" /> -{' '}
            {handle ? handle : `${firstName} ${lastName}`}
          </span>
        </div>
      </div>
    );
  });
  return (
    <div className="row">
      {console.log(posts)}
      {postsDisplay}
    </div>
  );
};

PostsDisplay.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostsDisplay;
