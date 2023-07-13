import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, CardTitle } from 'reactstrap';

const DashboardOverviewCard = (props) => (
  <Card>
    <CardBody>
      <div className="d-flex">
        <CardTitle tag="h6">{props.title}</CardTitle>
      </div>
      <div className="text-center my-4">
        <h2>{props.value}</h2>
      </div>
      <div className="d-flex">
        <span>{props.footerTitle}</span>
        <span className={`ml-auto ${props.footerTitleClassName}`}>
          <i className={`fa mr-1 fa-${props.footerIcon}`}></i>
          {props.footerValue}
        </span>
      </div>
    </CardBody>
  </Card>
);
DashboardOverviewCard.propTypes = {
  title: PropTypes.node,
  value: PropTypes.node,
  footerTitle: PropTypes.node,
  footerTitleClassName: PropTypes.node,
  footerIcon: PropTypes.node,
  footerValue: PropTypes.node,
};
DashboardOverviewCard.defaultProps = {
  title: 'Waiting',
  value: '0.000',
  footerTitle: 'Waiting',
  footerTitleClassName: 'text-muted',
  footerIcon: 'caret-down',
  footerValue: '0.00%',
};

export { DashboardOverviewCard };
