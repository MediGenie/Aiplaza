import React, { useMemo } from 'react';
import { useRoutesContext } from '../../routes/context/RoutesContext';
// import { useAuthContext } from '../../store/hooks/useAuthContext';
import { SidebarMenu } from './../../components';

export const SidebarMiddleNav = () => {
  const pages = useRoutesContext();
  const _pages = useMemo(() => {
    return pages.filter((page) =>
      Object.prototype.hasOwnProperty.call(page, 'label'),
    );
  }, [pages]);
  // const [user] = useAuthContext();
  return (
    <SidebarMenu>
      {_pages.map((page, index) => {
        if (Object.prototype.hasOwnProperty.call(page, 'rows')) {
          return (
            <SidebarMenu.Item title={page.label} icon={page.icon} key={index}>
              {page.rows.map((row) => {
                // if (user.isLogin === true && row.role instanceof Array) {
                //   const role = user.userInfo.role;
                //   const isValid = row.role.includes(role);
                //   if (!isValid === false) {
                //     return <></>;
                //   }
                // }
                return (
                  <SidebarMenu.Item
                    title={row.label}
                    to={row.path}
                    key={row.path}
                  />
                );
              })}
            </SidebarMenu.Item>
          );
        }
        return (
          <SidebarMenu.Item title={page.label} to={page.path} key={page.path} />
        );
      })}
    </SidebarMenu>
  );
};
