import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0;
  justify-content: space-between;
  position: relative;
`;

const ChildrenDiv = styled.div``;

const LayoutContent = (props) => {
  return (
    <Wrapper className="layout__content d-flex flex-column h-100">
      <ChildrenDiv className="children-div">{props.children}</ChildrenDiv>
    </Wrapper>
  );
};

LayoutContent.propTypes = {
  children: PropTypes.node,
};
LayoutContent.layoutPartName = 'content';

export { LayoutContent };
