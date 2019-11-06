import React from 'react';

const Spinner = () => {
  return (
    <div className="text-center p-5">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p>
        <small>Loading...</small>
      </p>
    </div>
  );
};

export default Spinner;
