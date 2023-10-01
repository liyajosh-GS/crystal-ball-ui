import { createContext, useContext, useState, ReactNode } from "react";
import { User, AppContextProps } from "../models/contexts/AppContextProps";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [route, setRoute] = useState<string>("");

  return (
    <AppContext.Provider value={{ user, route, setUser, setRoute }}>
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
