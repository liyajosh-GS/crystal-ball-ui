import { createContext, useContext, useState, ReactNode } from "react";
import { AppContextProps } from "../models/contexts/AppContextProps";

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [redirectBackTo, setRedirectBackTo] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ redirectBackTo, setRedirectBackTo }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
