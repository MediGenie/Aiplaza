import React from 'react';
import { Link } from 'react-router-dom';

import { Sidebar, SidebarTrigger } from './../../components';

import { SidebarMiddleNav } from './SidebarMiddleNav';

import { SidebarBottomA } from '../../routes/components/Sidebar/SidebarBottomA';
import { LogoThemed } from '../../routes/components/LogoThemed/LogoThemed';
// import { FooterAuth } from '../../routes/components/Pages/FooterAuth';
import PersonalButtonArea from '../../routes/components/Sidebar/PersonalButtonArea';

export const DefaultSidebar = () => {
  // const state = useContextState();

  return (
    <Sidebar>
      {/* START SIDEBAR-OVERLAY: Close (x) */}
      <Sidebar.Close>
        <SidebarTrigger tag={'a'} href="javascript:;">
          <i className="fa fa-times-circle fa-fw"></i>
        </SidebarTrigger>
      </Sidebar.Close>
      {/* START SIDEBAR-OVERLAY: Close (x) */}
      {/* START SIDEBAR: Only for Desktop */}
      <Sidebar.HideSlim>
        <Sidebar.Section>
          <Link to="/" className="sidebar__brand">
            <LogoThemed width="201px" height="60px" />
          </Link>
        </Sidebar.Section>
      </Sidebar.HideSlim>
      {/* END SIDEBAR: Only for Desktop */}
      <Sidebar.MobileFluid>
        <Sidebar.Section fluid cover>
          <SidebarMiddleNav />
        </Sidebar.Section>
        <Sidebar.HideSlim>
          <Sidebar.Section cover>
            <PersonalButtonArea />
          </Sidebar.Section>
        </Sidebar.HideSlim>
        <SidebarBottomA />
      </Sidebar.MobileFluid>
    </Sidebar>
  );
};
