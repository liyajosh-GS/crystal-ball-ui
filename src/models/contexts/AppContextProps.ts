export interface AppContextProps {
  redirectBackTo: string | null;
  setRedirectBackTo: (route: string) => void;
}
