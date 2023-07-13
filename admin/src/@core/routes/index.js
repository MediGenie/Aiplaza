import React, { Suspense, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DefaultNavbar } from '../layout/components/DefaultNavbar';
import { DefaultSidebar } from '../layout/components/DefaultSidebar';
// import { useAuthContext } from '../store/hooks/useAuthContext';
import Error404 from './components/Error404';
import { useRoutesContext } from './context/RoutesContext';
import { AuthoizedRoute, UnAuthoizedRoute } from './ProtectRoute';

export const RoutedNavbars = () => (
  <Switch>
    <Route component={DefaultNavbar} />
  </Switch>
);

export const RoutedSidebars = () => (
  <Switch>
    <Route component={DefaultSidebar} />
  </Switch>
);

export const RouteGenerator = () => {
  const pages = useRoutesContext();
  // const [user] = useAuthContext();

  const _pages = useMemo(() => {
    return pages.flatMap((v) =>
      Object.prototype.hasOwnProperty.call(v, 'rows') ? v.rows : v,
    );
  }, [pages]);

  return (
    <Suspense fallback={<></>}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        {_pages.map((v, i) => {
          let Page = Route;
          if (v.authorized === true) {
            Page = AuthoizedRoute;
          } else if (v.authorized === false) {
            Page = UnAuthoizedRoute;
          }
          // if (user.isLogin === true && v.role instanceof Array) {
          //   const role = user.userInfo.role;
          //   const isValid = v.role.includes(role);
          //   if (isValid === false) {
          //     return null;
          //   }
          // }
          return (
            <Page
              path={v.path}
              exact={v.exact || false}
              component={v.component}
              key={i}
            />
          );
        })}
        <Route>
          <Error404 />
        </Route>
      </Switch>
    </Suspense>
  );
};
