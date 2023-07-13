import React from 'react';
import PropTypes from 'prop-types';

const HeaderMain = (props) => (
  <React.Fragment>
    {/* START H1 Header */}
    <div
      className={` d-flex ${props.className}`}
      style={{ maxWidth: '90%', margin: '0 auto', padding: '0 15px' }}
    >
      <h2 className="display-5 mr-3 mb-0 align-self-start">{props.title}</h2>
      <h5 style={{ opacity: 0.5 }}>{props.subTitle}</h5>
    </div>
    {/* END H1 Header */}
  </React.Fragment>
);
HeaderMain.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};
HeaderMain.defaultProps = {
  title: 'Waiting for Data...',
  subTitle: '',
  className: 'my-4',
};

export { HeaderMain };
