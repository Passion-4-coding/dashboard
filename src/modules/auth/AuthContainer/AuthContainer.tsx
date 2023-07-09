import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import { getToken } from "../api";
import { axios } from "../../axios";
import { InternalAxiosRequestConfig } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { fetchUser } from "../slice";
import { useAbility } from "@casl/react";
import { AbilityContext, setupAbilities } from "../../casl";

const { VITE_DISCORD_CLIENT_ID, VITE_DISCORD_REDIRECT_URL } = import.meta.env;

const getAuthLink = () => {
  return `https://discord.com/api/oauth2/authorize?client_id=${VITE_DISCORD_CLIENT_ID}&redirect_uri=${VITE_DISCORD_REDIRECT_URL}&response_type=code&scope=identify`;
};

interface Props {
  children: ReactNode;
}

export const AuthContainer: FC<Props> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const ability = useAbility(AbilityContext);
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => {
    return state.auth.user;
  });

  const updateAxiosConfig = (token: string) => {
    if (token) {
      axios.interceptors.request.use(
        async (config) => {
          const headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${token}`,
          };
          const newConfig = {
            ...config,
            headers,
          } as InternalAxiosRequestConfig;
          return newConfig;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  };

  const handleInit = useCallback(async () => {
    let token = Cookies.get("token");
    if (token) {
      updateAxiosConfig(token);
      dispatch(fetchUser());
    }
    const code = searchParams.get("code");
    if (code && !token) {
      const tokenResponse = await getToken(code);
      Cookies.set("token", tokenResponse.data);
      token = tokenResponse.data;
      updateAxiosConfig(token);
      dispatch(fetchUser());
    }
    if (!token) {
      window.location.href = getAuthLink();
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    handleInit();
  }, [handleInit]);

  useEffect(() => {
    if (!user) return;
    setupAbilities(user.scopes, ability);
    setLoading(false);
  }, [user, ability]);

  if (loading) {
    return <>Loading</>;
  }

  return <>{children}</>;
};
