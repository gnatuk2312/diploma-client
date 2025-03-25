"use client";

import { createContext, useContext } from "react";

import { SnackbarContextInterface } from "./snackbar.types";

export const SnackbarContext = createContext<SnackbarContextInterface | null>(
  null
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (context === null) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  return context;
};
