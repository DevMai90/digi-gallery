import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const Alert = ({ alert }) => {
  if (alert !== null && alert.length > 0) {
    return alert.map(alert => {
      return (
        <div
          key={alert.id}
          className={`bg-${alert.alertType} text-center text-white`}
        >
          <p className="my-2">{alert.msg}</p>
        </div>
      );
    });
  }

  return null;
};

Alert.propTypes = {
  alert: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert);
