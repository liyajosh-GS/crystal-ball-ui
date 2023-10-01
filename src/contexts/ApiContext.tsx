import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

export const ApiContext = createContext<{ [key: string]: any }>({});

export function ApiProvider({ children }: { children: ReactNode }) {
  const [apiConfig, setApiConfig] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    fetch("/apiConfig.json")
      .then((response) => response.json())
      .then((data: { [key: string]: any }) => {
        console.log("data " + data);
        setApiConfig(data);
      })
      .catch((error) => {
        console.error("Error fetching config.json:", error);
      });
  }, []);

  return (
    <ApiContext.Provider value={{ apiConfig }}>{children}</ApiContext.Provider>
  );
}

export function useApiContext() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("12 not defined");
  }
  return context;
}
