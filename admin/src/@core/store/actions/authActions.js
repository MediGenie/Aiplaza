export const LOGIN = 'auth/LOGIN';
export const LOGOUT = 'auth/LOGOUT';
export const REFRESH_ACCESS_TOKEN = 'auth/REFRESH_ACCESS_TOKEN';
export const REFRESH_USER_DATA = 'auth/REFRESH_USER_DATA';

export const authActionCreator = {
  Login: (loginInfo) => {
    return {
      type: LOGIN,
      payload: loginInfo,
    };
  },
  Logout: () => {
    return {
      type: LOGOUT,
    };
  },
  refreshAccessToken: (access_token) => {
    return {
      type: REFRESH_ACCESS_TOKEN,
      payload: access_token,
    };
  },
  refreshUserData: (userInfo) => ({
    type: REFRESH_USER_DATA,
    payload: userInfo,
  }),
};
