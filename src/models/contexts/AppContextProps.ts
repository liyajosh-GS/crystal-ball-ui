export interface User {
  id: number;
  username: string;
}

export interface AppContextProps {
  user: any;
  route: string;
  setUser: (user: any) => void;
  setRoute: (route: string) => void;
}
