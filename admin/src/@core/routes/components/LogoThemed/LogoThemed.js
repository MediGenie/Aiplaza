import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import logoSvg from '@images/logos/Logo.svg';

const LogoThemed = ({ className, height, ...otherProps }) => (
  <img
    src={logoSvg}
    style={{
      // backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    }}
    className={classNames('d-block', className)}
    {...otherProps}
  />
);
LogoThemed.propTypes = {
  className: PropTypes.string,
};

export { LogoThemed };
