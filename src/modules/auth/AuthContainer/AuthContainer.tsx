import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getToken } from "../api";
import { axios } from "../../axios";
import { InternalAxiosRequestConfig } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { fetchUser } from "../slice";
import { useAbility } from "@casl/react";
import { AbilityContext, setupAbilities } from "../../casl";

interface Props {
  children: ReactNode;
}

export const AuthContainer: FC<Props> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
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
    const token = Cookies.get("token");
    if (token) {
      updateAxiosConfig(token);
      dispatch(fetchUser());
    }
    const code = searchParams.get("code");
    if (code && !token) {
      const token = await getToken(code);
      Cookies.set("token", token.data);
    }
    if (!token) {
      window.location.href =
        "https://discord.com/api/oauth2/authorize?client_id=1073166922704764939&redirect_uri=http%3A%2F%2Flocalhost%3A5173&response_type=code&scope=identify";
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
