export interface User {
  id: number;
  username: string;
}

export interface AppContextProps {
  user: User | null;
  route: string;
  setUser: (user: User | null) => void;
  setRoute: (route: string) => void;
}
