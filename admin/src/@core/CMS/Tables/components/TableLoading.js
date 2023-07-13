import React from 'react';
import PropTypes from 'prop-types';

export default function TableLoading({ isLoading }) {
  return isLoading ? (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(249, 250, 252,.4)',
          position: 'absolute',
          zIndex: 10,
        }}
      ></div>
      <div
        className="custom-loader"
        style={{
          fontSize: '5px',
          position: 'absolute',
          top: '30%',
          left: '50%',
        }}
      />
    </>
  ) : null;
}
TableLoading.propTypes = {
  isLoading: PropTypes.bool,
};
TableLoading.defaultProps = {
  isLoading: false,
};
