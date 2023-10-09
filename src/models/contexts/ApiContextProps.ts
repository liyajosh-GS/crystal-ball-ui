import { AlertColor } from "@mui/material";

export interface ApiContextProps {
  showSnackBar: boolean;
  apiResponseMessage: string | undefined;
  apiResponseType: AlertColor;
  setShowSnackBar: (show: boolean) => void;
  setApiResponseMessage: (response: string) => void;
  setApiResponseType: (type: AlertColor) => void;
  apiConfig: { [key: string]: any };
}
