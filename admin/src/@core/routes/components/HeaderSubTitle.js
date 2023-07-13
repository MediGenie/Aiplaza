import React from "react";
import PropTypes from "prop-types";
import { Media } from "reactstrap";

const HeaderSubTitle = (props) => (
  <Media className={props.customClass}>
    <Media left top>
      <h1 className="mr-3 display-4 text-muted">{props.no}.</h1>
    </Media>
    <Media body>
      <h4 className="mt-1">{props.title}</h4>
      <p>{props.subTitle}</p>
    </Media>
  </Media>
);

HeaderSubTitle.propTypes = {
  no: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  customClass: PropTypes.string,
};
HeaderSubTitle.defaultProps = {
  customClass: "mt-5 mb-3",
};

export { HeaderSubTitle };
