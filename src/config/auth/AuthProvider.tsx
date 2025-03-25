"use client";

import { useState, useEffect, ReactNode, FC } from "react";
import { useRouter } from "next/navigation";

import { AuthInterface } from "@/interfaces/auth.interface";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_KEY,
} from "./auth.constants";
import { AuthContext } from "./auth.context";

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = (props) => {
  const { children } = props;

  const [user, setUser] = useState<any | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedAccessToken && storedRefreshToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const setAuth = (auth: AuthInterface) => {
    const { accessToken, refreshToken, user } = auth;

    setUser(user);

    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
