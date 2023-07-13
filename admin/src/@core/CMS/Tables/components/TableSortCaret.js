import React from 'react';
import PropTypes from 'prop-types';

export default function TableSortCaret({ order }) {
  return !order ? (
    <i className={`fa fa-fw text-muted fa-sort`}></i>
  ) : (
    <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>
  );
}
TableSortCaret.propTypes = {
  order: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
};
TableSortCaret.defaultProps = {};
