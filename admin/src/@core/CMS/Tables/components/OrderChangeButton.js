import React from 'react';
import PropTypes from 'prop-types';

export default function OrderChangeButton({ id, to, onClick }) {
  return (
    <button
      className="btn btn-primary mr-1"
      onClick={() => {
        onClick(id, to);
      }}
    >
      {to === 'prev' ? (
        <i className={`fa fa-fw fa-arrow-up`}></i>
      ) : (
        <i className={`fa fa-fw  fa-arrow-down`}></i>
      )}
    </button>
  );
}
OrderChangeButton.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string.isRequired,
};
OrderChangeButton.defaultProps = {};
