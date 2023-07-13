import React, { useMemo } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("cannot find authContext");
  return context;
}

export function withAuthContext(Component) {
  // eslint-disable-next-line react/display-name
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <AuthContext.Consumer>
          {(context) => {
            return <Component authcontext={context} {...this.props} />;
          }}
        </AuthContext.Consumer>
      );
    }
  };
}

export function useIsAdmin() {
  const [auth] = useAuthContext();
  const isAdmin = useMemo(() => {
    return auth?.userInfo?.isAdmin === true ? true : false;
  }, [auth?.userInfo?.isAdmin]);

  return isAdmin;
}
