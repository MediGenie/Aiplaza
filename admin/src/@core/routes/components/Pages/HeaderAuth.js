import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from "react-router-dom";

import { LogoThemed } from './../LogoThemed/LogoThemed';

const HeaderAuth = (props) => (
  <div className="mb-4">
    <div className="mb-1 text-center">
      <div className="d-inline-block">
        {props.icon ? (
          <i className={`fa fa-${props.icon} fa-3x ${props.iconClassName}`}></i>
        ) : (
          <LogoThemed width="210px" height="50px" />
        )}
      </div>
    </div>
    <h5
      className="text-center mb-4"
      style={{
        fontWeight: 'bold',
        fontSize: 22.7,
        letterSpacing: -0.79,
      }}
    >
      {props.title}
    </h5>
    <p className="text-center" style={{ whiteSpace: 'break-spaces' }}>
      {props.text}
    </p>
  </div>
);
HeaderAuth.propTypes = {
  icon: PropTypes.node,
  iconClassName: PropTypes.node,
  title: PropTypes.node,
  text: PropTypes.node,
};
HeaderAuth.defaultProps = {
  title: 'Waiting for Data...',
  text: ``,
  iconClassName: 'text-theme',
  fromLogin: false,
};

export { HeaderAuth };
