import {
  LOGIN,
  LOGOUT,
  REFRESH_ACCESS_TOKEN,
  REFRESH_USER_DATA,
} from '../actions/authActions';

export const initialState = {
  isLogin: false,
  userInfo: {},
};

export function authReducer(prevState, action) {
  switch (action.type) {
    case LOGOUT: {
      return {
        isLogin: false,
        userInfo: {},
      };
    }
    case LOGIN: {
      const user = action.payload;
      return {
        isLogin: true,
        userInfo: user,
      };
    }
    case REFRESH_ACCESS_TOKEN: {
      if (prevState.isLogin === false) {
        return prevState;
      }
      return {
        isLogin: true,
        userInfo: {
          ...prevState.userInfo,
          access_token: action.payload,
        },
      };
    }
    case REFRESH_USER_DATA: {
      if (prevState.isLogin === false) {
        return prevState;
      }
      return {
        isLogin: true,
        userInfo: {
          ...action.payload,
          access_token: prevState.userInfo.access_token,
        },
      };
    }
    default: {
      console.warn('authContext의 action type이 잘못되었습니다');
      return prevState;
    }
  }
}
