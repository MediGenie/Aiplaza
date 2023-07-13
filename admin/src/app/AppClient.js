import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppLayout from '@core/layout/default';
// import { RoutedContent } from '@core/routes';
import AuthProvider from '@core/store/AuthProvider';
import { useAuthContext } from '@core/store/hooks/useAuthContext';
import axios from 'axios';
import { authActionCreator } from '@core/store/actions/authActions';
import { pages } from './pages';
import { RoutesProvider } from '../@core/routes/context/RoutesContext';
import { RouteGenerator } from '../@core/routes';

function Root() {
  const [isReady, setIsReady] = useState(false);
  const [auth, authDispatch] = useAuthContext();

  // access_key 삽입
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const access_token = auth.userInfo?.access_token;
        if (access_token && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [auth]);

  // 자동로그인
  useEffect(() => {
    let isMount = true;
    const controller = new AbortController();

    async function persistLogin() {
      try {
        const response = await axios.get('/auth/access-token', {
          signal: controller.signal,
        });
        const { access_token } = response.data;
        const meResponse = await axios.get('/auth/me', {
          headers: { Authorization: `Bearer ${access_token}` },
          signal: controller.signal,
        });
        const data = meResponse.data;
        const loginInfo = {
          access_token,
          ...data,
        };
        if (isMount === true) {
          authDispatch(authActionCreator.Login(loginInfo));
        }
      } catch (e) {
        // NOTHING
      } finally {
        setIsReady(true);
      }
    }

    persistLogin();

    return () => {
      console.log('취소');
      isMount = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isReady) {
    return <></>;
  }

  return (
    <AppLayout>
      <RouteGenerator />
    </AppLayout>
  );
}

const AppClient = () => {
  return (
    <RoutesProvider value={pages}>
      <Router basename="/adm">
        <AuthProvider>
          <Root />
        </AuthProvider>
      </Router>
    </RoutesProvider>
  );
};

export default AppClient;
