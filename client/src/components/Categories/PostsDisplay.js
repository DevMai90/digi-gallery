import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const PostsDisplay = ({ posts }) => {
  const postsDisplay = posts.map((post, index) => {
    const { _id, title, image, firstName, lastName, handle, date } = post;

    return (
      <div key={_id} className="col-md-4 my-2">
        <div className="p-3">
          <img src={image} alt="" />
          <h3>{title}</h3>
          <span>
            <Moment date={date} format="MMMM Do YYYY" /> -{' '}
            {handle ? handle : `${firstName} ${lastName}`}
          </span>
        </div>
      </div>
    );
  });
  return <div>{postsDisplay}</div>;
};

PostsDisplay.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostsDisplay;
