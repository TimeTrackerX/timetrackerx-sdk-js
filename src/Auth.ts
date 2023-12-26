import axios, { AxiosInstance } from 'axios';

export interface AuthUser {
    id: number;
    name: string;
    avatar?: string;
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
}

interface AuthError extends Error {
    name: string;
    message: string;
}

type AuthResult =
    | {
          auth: AuthResponse;
          error: undefined;
      }
    | {
          auth: undefined;
          error: AuthError;
      };

interface BaseAuthParams {
    baseUrl?: string;
    http?: AxiosInstance;
}

interface AuthParamsWithBaseUrl extends BaseAuthParams {
    baseUrl: string;
}

interface AuthParamsWithHttp extends BaseAuthParams {
    http: AxiosInstance;
}

type AuthParams = AuthParamsWithHttp | AuthParamsWithBaseUrl;

export class Auth {
    defaultBaseUrl = 'http://localhost:4000';
    http: AxiosInstance;

    constructor({ baseUrl, http }: AuthParams) {
        this.http =
            http ||
            axios.create({
                baseURL: baseUrl,
            });
        this.http.defaults.validateStatus = status => status > 199 && status < 600;
    }

    async authenticateWithGoogleCode(code: string): Promise<AuthResult> {
        const uri = '/auth/google/callback';
        const params = { code };
        const { data, status } = await this.http.get<AuthResponse>(uri, { params });

        return status === 200
            ? { auth: data as AuthResponse, error: undefined }
            : { auth: undefined, error: data as unknown as AuthError };
    }
}
