"use client";

import React, { useState, ReactNode, FC } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { SnackbarSeverityType, SnackbarStateInterface } from "./snackbar.types";
import { SnackbarContext } from "./snackbar.context";

type Props = {
  children: ReactNode;
};

const SnackbarProvider: FC<Props> = (props) => {
  const { children } = props;

  const [snackbar, setSnackbar] = useState<SnackbarStateInterface>({
    message: "",
    open: false,
    severity: "info",
  });

  const showSnackbar = (
    message: string,
    severity: SnackbarSeverityType = "info"
  ) => {
    setSnackbar({ message, open: true, severity });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
