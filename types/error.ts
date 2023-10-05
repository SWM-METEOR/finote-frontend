interface AxiosErrorConfig {
  transitional: {
    silentJSONParsing: boolean;
    forcedJSONParsing: boolean;
    clarifyTimeoutError: boolean;
  };
  adapter: string[];
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Record<string, unknown>;
  headers: {
    Accept: string;
    Authorization: string;
  };
  baseURL: string;
  method: string;
  url: string;
}

export interface ServerErrorResponse {
  message: string;
  name: string;
  stack: string;
  config: AxiosErrorConfig;
  code: string;
  status: number;
}
