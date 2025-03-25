export type SnackbarSeverityType = "success" | "error" | "warning" | "info";

export interface SnackbarContextInterface {
  showSnackbar: (message: string, severity?: SnackbarSeverityType) => void;
}

export interface SnackbarStateInterface {
  message: string;
  open: boolean;
  severity: SnackbarSeverityType;
}
