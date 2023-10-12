import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { ApiContextProps } from "../models/contexts/ApiContextProps";
import { AlertColor } from "@mui/material";

export const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export function ApiProvider({ children }: { children: ReactNode }) {
  const [apiConfig, setApiConfig] = useState<any>(null);
  const [apiResponseMessage, setApiResponseMessage] = useState<
    string | undefined
  >(undefined);
  const [apiResponseType, setApiResponseType] = useState<AlertColor>("success");
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);

  useEffect(() => {
    console.log("triggered");
    if (apiConfig === null) {
      fetch("/apiConfig.json")
        .then((response) => response.json())
        .then((data: { [key: string]: any }) => {
          console.log("data " + data);
          setApiConfig(data);
        })
        .catch((error) => {
          console.error("Error fetching config.json:", error);
        });
    }
  }, [window.location.href]);

  return (
    <ApiContext.Provider
      value={{
        apiConfig,
        apiResponseMessage,
        apiResponseType,
        showSnackBar,
        setApiResponseMessage,
        setApiResponseType,
        setShowSnackBar,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export function useApiContext() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext not defined");
  }
  return context;
}
