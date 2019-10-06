import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MainArticle from './MainArticle';
import SecondaryArticles from './SecondaryArticles';
import TertiaryArticles from './TertiaryArticles';

import { connect } from 'react-redux';
import { getHomePosts } from '../../actions/post';

const Home = ({ getHomePosts }) => {
  // Component state to set limit to be sent to backend?
  // Initial is 15 posts?
  // Make second call and skip the first 15? Calls on 6 after component state.
  // Pass props to components.
  // Add 6 to component state and make second API call
  useEffect(() => {
    const limits = {
      limit: 15
    };

    getHomePosts(limits);
  }, []);
  return (
    <div id="homepage">
      <MainArticle />
      <SecondaryArticles />
      <TertiaryArticles />
    </div>
  );
};

export default connect(
  null,
  { getHomePosts }
)(Home);
