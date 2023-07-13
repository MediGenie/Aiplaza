import React from 'react';

import {
  Button,
  Sidebar,
  UncontrolledPopover,
  PopoverBody,
} from '@core/components';

import { FooterText } from '../FooterText';
import styled from 'styled-components';

const FooterTextStyle = styled.article`
  font-size: 12px;
`;
const SidebarBottomA = () => (
  <React.Fragment>
    {/* START Desktop */}
    <Sidebar.HideSlim>
      <Sidebar.Section>
        <FooterTextStyle>
          <FooterText />
        </FooterTextStyle>
      </Sidebar.Section>
    </Sidebar.HideSlim>
    {/* END Desktop */}

    {/* START Slim Only */}
    <Sidebar.ShowSlim>
      <Sidebar.Section className="text-center">
        {/* Footer Text as Tooltip */}
        <Button
          id="UncontrolledSidebarPopoverFooter"
          color="link"
          className="sidebar__link p-0 mt-3"
        >
          <i className="fa fa-fw fa-question-circle-o"></i>
        </Button>
        <UncontrolledPopover
          placement="left"
          target="UncontrolledSidebarPopoverFooter"
        >
          <PopoverBody>
            <FooterTextStyle>
              <FooterText />
            </FooterTextStyle>
          </PopoverBody>
        </UncontrolledPopover>
      </Sidebar.Section>
    </Sidebar.ShowSlim>
    {/* END Slim Only */}
  </React.Fragment>
);

export { SidebarBottomA };
