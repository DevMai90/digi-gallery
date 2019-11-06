import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getPost } from '../../actions/post';

const Posts = ({ post: { post, loading }, getPost, match }) => {
  return (
    <div>
      <h3>Posts</h3>
    </div>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Posts);
