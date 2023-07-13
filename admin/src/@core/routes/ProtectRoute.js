import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '@core/store/hooks/useAuthContext';
import PropTypes from 'prop-types';
import { DEFAULT_PAGE_PATH } from '../utils/constants';

export default function ProtectRoute({
  shouldLogin = false,
  redirect = '/login',
  children,
  component: RouteComponent,
  ...rest
}) {
  const [auth] = useAuthContext();

  return (
    <Route
      {...rest}
      render={() => {
        const renderComponent = () => {
          if (RouteComponent) {
            return <RouteComponent />;
          }
          return children;
        };
        const renderRedirect = () => {
          console.warn(rest.path, 'redirect to', rest.redirect);
          return <Redirect to={redirect} />;
        };
        return auth.isLogin === shouldLogin
          ? renderComponent()
          : renderRedirect();
      }}
    />
  );
}

ProtectRoute.propTypes = {
  shouldLogin: PropTypes.bool,
  redirect: PropTypes.string,
  children: PropTypes.any,
  component: PropTypes.any,
};

export function UnAuthoizedRoute(props) {
  return (
    <ProtectRoute {...props} redirect={DEFAULT_PAGE_PATH} shouldLogin={false} />
  );
}

export function AuthoizedRoute(props) {
  return <ProtectRoute {...props} redirect="/login" shouldLogin={true} />;
}
