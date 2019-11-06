import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PostArticle from './PostArticle';
import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';
import { getPost } from '../../actions/post';

const Posts = ({ post: { post, loading }, getPost, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  // || ?
  return loading || !post ? <Spinner /> : <PostArticle post={post} />;
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
