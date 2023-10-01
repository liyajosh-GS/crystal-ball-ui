export interface ConfigType {
  apiConfig: { [key: string]: any };
}

export interface ApiConfigProps {
  apis: string[];
  setApis: (api: string[]) => void;
  isApiLoading: boolean;
  apiError: string;
  makeApiRequest?: () => void;
}
