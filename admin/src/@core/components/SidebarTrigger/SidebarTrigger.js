import React from "react";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";
import { withPageConfig } from "./../Layout";

const SidebarTrigger = (props) => {
  return (
    // 01/18 sidebar-trigger mt-2
    <div
      className="sidebar-trigger"
      onClick={() => {
        props.pageConfig.toggleSidebar();
      }}
    >
      {props.children}
    </div>
  );
};
SidebarTrigger.propTypes = {
  children: PropTypes.node,
  pageConfig: PropTypes.object,
};
SidebarTrigger.defaultProps = {
  children: <i className="fa fa-bars fa-fw"></i>,
};

const cfgSidebarTrigger = withPageConfig(SidebarTrigger);

export { cfgSidebarTrigger as SidebarTrigger };
