import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PostsDisplay from './PostsDisplay';
import PostsNotFound from './PostsNotFound';
import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

import capitalizeWord from '../../utils/capitalizeWord';

const Categories = ({
  post: { posts, loading },
  getPosts,
  match: {
    params: { category }
  }
}) => {
  useEffect(() => {
    getPosts(capitalizeWord(category));
  }, [getPosts, category]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center m-auto">
          <header>
            <h1>Filter by Category: {capitalizeWord(category)}</h1>
            <hr />
          </header>
        </div>
      </div>
      {loading && !posts.length ? (
        <Spinner />
      ) : !posts.length ? (
        <PostsNotFound />
      ) : (
        <PostsDisplay posts={posts} />
      )}
    </div>
  );
};

Categories.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Categories);
