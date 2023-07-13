import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { authApis } from "../apis/auth";
import { axiosInstance } from "../apis/instance";
import { SocialType } from "../types/social.type";
import { AuthDispatchContext, AuthValueContext } from "./context";
import { User, UserType } from "./type";

interface AuthProviderProps {
  children?: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ user: User | null }>({ user: null });

  const login = useCallback(
    (
      username: string,
      password: string,
      type: UserType,
      isPersist: boolean
    ) => {
      return authApis
        .login(username, password, type, isPersist)
        .then((_user) => {
          setUser({ user: _user });
        });
    },
    []
  );
  const logout = useCallback(() => {
    return authApis.logout().then(() => setUser({ user: null }));
  }, []);
  const getAccessToken = useCallback(() => {
    return authApis.getAccessToken();
  }, []);
  const loadUserInfo = useCallback(() => {
    return authApis.loadUserInfo();
  }, []);
  const socialLogin = useCallback(
    (
      id: string,
      social_type: SocialType,
      type: "provider" | "consumer",
      isPersist: boolean
    ) => {
      return authApis
        .signUpSocial({
          id: id,
          account_type: type.toLowerCase() as any,
          isPersist: isPersist,
          type: social_type,
        })
        .then((_user) => {
          setUser({ user: _user });
        });
    },
    []
  );
  const dispatch = useMemo(() => {
    return {
      login,
      logout,
      getAccessToken,
      loadUserInfo,
      socialLogin,
    };
  }, [getAccessToken, loadUserInfo, login, logout, socialLogin]);

  // 로그인 처리
  useEffect(() => {
    (async () => {
      try {
        const access_token = await authApis.getAccessToken();
        const user = await authApis.loadUserInfo(access_token);
        if (user) {
          setUser({
            user: {
              ...user,
              access_token,
            },
          });
        }
      } catch {}
    })().finally(() => {
      setIsLoading(true);
    });
  }, []);

  // access_token 해더 처리
  useEffect(() => {
    const token = user.user?.access_token;
    if (token) {
      const Authorization = token ? `Bearer ${token}` : undefined;
      axiosInstance.interceptors.request.use(
        (config) => {
          if (
            typeof (config.headers as any)?.["Authorization"] === "undefined" &&
            Authorization
          ) {
            config.headers = {
              ...(config.headers || {}),
              Authorization,
            };
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      axiosInstance.interceptors.response.use(
        (config) => {
          return config;
        },
        async (error) => {
          const originalConfig = error.config;
          const isAuthApis = originalConfig.url.startsWith("/auth");
          if (
            isAuthApis === false &&
            error.response &&
            originalConfig._retry !== true &&
            error.response.status === 401
          ) {
            originalConfig._retry = true;
            try {
              console.log("토큰 획득");
              const getToken = await axiosInstance.post("/auth/access-token");
              console.log("토큰을 가져옴: " + getToken.data);
              const { access_token } = getToken.data;
              const getUser = await authApis.loadUserInfo(access_token);
              setUser({
                user: {
                  ...getUser,
                  access_token,
                },
              });
              return axiosInstance(originalConfig);
            } catch (_error) {
              return Promise.reject(_error);
            }
          }
          return Promise.reject(error);
        }
      );

      return () => {
        axiosInstance.interceptors.request.clear();
        axiosInstance.interceptors.response.clear();
      };
    }
  }, [user.user]);

  if (isLoading === false) {
    return null;
  }

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthValueContext.Provider value={user}>
        {children}
      </AuthValueContext.Provider>
    </AuthDispatchContext.Provider>
  );
}
