import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const NewPost = ({ addPost }) => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    postText: '',
    image: null
  });

  const { category, title, postText } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeImage = e =>
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center m-auto">
          <header>
            <h1>New Post</h1>
            <hr />
          </header>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 ml-5">
          <form action="submit">
            <div className="form-group">
              <select
                name="category"
                className="custom-select"
                value={category}
                onChange={e => onChange(e)}
              >
                <option value="all">All</option>
                <option value="automotive">Automotive</option>
                <option value="photography">Photography</option>
                <option value="nature">Nature</option>
                <option value="daily">Daily</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="animals">Animals</option>
                <option value="art">Art</option>
                <option value="people">People</option>
                <option value="other">Other</option>
              </select>
              <small className="text-muted">Category</small>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Enter email"
                value={title}
                onChange={e => onChange(e)}
              />
              <small className="text-muted">Title</small>
            </div>

            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
                name="image"
                onChange={e => onChangeImage(e)}
              />
              <small className="text-muted">
                Upload Photo - JPEG / JPG / PNG formats only
              </small>
            </div>

            <div className="form-group">
              <textarea
                name="postText"
                id="postTextArea"
                cols="30"
                rows="5"
                className="form-control"
                placeholder="Enter text..."
                maxLength="500"
                value={postText}
                onChange={e => onChangeImage(e)}
              ></textarea>
              <small className="text-muted">Tell us about your photo</small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

NewPost.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(NewPost);
