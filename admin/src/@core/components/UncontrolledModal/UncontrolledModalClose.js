import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { Consumer } from './context';

const UncontrolledModalClose = (props, ref) => {
  const { tag, ...otherProps } = props;
  const Tag = tag;

  return (
    <Consumer>
      {(value) => (
        <button
          className="btn btn-windows"
          ref={ref}
          {...otherProps}
          onClick={() => {
            value.toggleModal();
            if (props && props.onClick && typeof props.onClick === 'function') {
              props.onClick();
            }
          }}
        />
      )}
    </Consumer>
  );
};
// UncontrolledModalClose.propTypes = {
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
// };
// UncontrolledModalClose.defaultProps = {
//   tag: Button,
// };

// export { UncontrolledModalClose };
export default React.forwardRef(UncontrolledModalClose);
