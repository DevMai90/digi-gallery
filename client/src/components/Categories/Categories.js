import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

import capitalizeWord from '../../utils/capitalizeWord';

const Categories = ({ match, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center m-auto">
          <header>
            <h1>Filter by Category: {capitalizeWord(match.params.category)}</h1>
            <hr />
          </header>
        </div>
      </div>

      <div className="row"></div>
    </div>
  );
};

Categories.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.post.posts
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Categories);
