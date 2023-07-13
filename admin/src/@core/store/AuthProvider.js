import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import DefaultModal from '../components/Modals';
import { authActionCreator } from './actions/authActions';
import { authReducer, initialState } from './reducers/authReducer';
import Axios from 'axios';
import { DEFAULT_PAGE_PATH } from '../utils/constants';

export const ExpiredModalContext = createContext();
export const AuthContext = createContext();

function ModalReducer(state, action) {
  switch (action.type) {
    case 'OPEN':
      return {
        visible: true,
        title: action.payload.title,
        body: action.payload.body,
        btnText: action.payload.btnText,
        to: action.payload.to,
      };
    case 'CLOSE':
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
}
export default function AuthProvider({ children }) {
  const [modalState, modalDispatch] = useReducer(ModalReducer, {
    visible: false,
    title: '',
    body: '',
    btnText: '',
    to: '',
  });
  const [store, stroeDispatch] = useReducer(authReducer, initialState);
  const history = useHistory();

  const showAuthModal = useCallback((title, body, btnText, to) => {
    modalDispatch({ type: 'OPEN', payload: { title, body, btnText, to } });
  }, []);

  const hideAuthModal = useCallback(() => {
    modalDispatch({ type: 'CLOSE' });
  }, []);

  const onCloseEvent = useCallback(async () => {
    if (modalState.to !== DEFAULT_PAGE_PATH) {
      stroeDispatch(authActionCreator.Logout());
    }
    history.push(modalState.to);
  }, [history, modalState.to]);

  useEffect(() => {
    if (store.isLogin) {
      const id = Axios.interceptors.response.use(
        (res) => {
          return res;
        },
        async (err) => {
          const originalConfig = err.config;
          if (
            originalConfig.url !== '/auth/login' &&
            originalConfig.url !== '/auth/access-token' &&
            err.response
          ) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
              originalConfig._retry = true;

              try {
                try {
                  const rs = await Axios.get('/auth/access-token');

                  const { access_token } = rs.data;
                  stroeDispatch(
                    authActionCreator.refreshAccessToken(access_token)
                  );
                  originalConfig.headers.Authorization = `Bearer ${access_token}`;
                } catch {
                  // NOTHING
                }

                return Axios(originalConfig);
              } catch (_error) {
                return Promise.reject(_error);
              }
            } else if (err.response.status === 401 && originalConfig._retry) {
              showAuthModal(
                '인증 오류',
                '인증정보가 만료되었거나 잘못되었습니다.',
                '로그인 화면으로',
                '/login'
              );
            } else if (err.response.status === 403) {
              showAuthModal(
                '접근권한 안내',
                '해당 게시판에 대한 권한이 없습니다.',
                '확인',
                DEFAULT_PAGE_PATH
              );
            }
          }

          return Promise.reject(err);
        }
      );
      return () => {
        Axios.interceptors.response.eject(id);
      };
    }
  }, [showAuthModal, store.isLogin]);

  return (
    <ExpiredModalContext.Provider value={showAuthModal}>
      <AuthContext.Provider value={[store, stroeDispatch]}>
        <DefaultModal
          isOpen={modalState.visible}
          ButtonMessage={modalState.btnText}
          bodyMessage={modalState.body}
          headerMessage={modalState.title}
          closeFunc={hideAuthModal}
          onCloseEvent={onCloseEvent}
        />
        {children}
      </AuthContext.Provider>
    </ExpiredModalContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
