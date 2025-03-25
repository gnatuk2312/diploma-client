"use client";

import { createContext, useContext } from "react";

import { AuthContextInterface } from "./auth.types";

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
