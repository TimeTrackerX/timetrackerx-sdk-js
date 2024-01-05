import { AxiosInstance, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

import { TokenStorageInterface } from './TokenStorageInterface';
import { HttpBuilder } from '../classes/HttpBuilder';
import { MemoryTokenStorage } from '../classes/MemoryTokenStorage';
import { TokenManager } from '../classes/TokenManager';

export interface ClassParams {
    baseUrl?: string;
    http?: AxiosInstance;
    tokenStorage?: TokenStorageInterface;
}

export class BaseClass {
    defaultBaseUrl = 'http://localhost:4000';

    http: AxiosInstance;
    tokenManager: TokenManager;

    constructor({ baseUrl, http, tokenStorage }: ClassParams) {
        this.tokenManager = new TokenManager(tokenStorage || new MemoryTokenStorage());
        this.http = http
            ? HttpBuilder.applyDefaults(http)
            : HttpBuilder.build({
                  baseURL: baseUrl || this.defaultBaseUrl,
              });
    }

    protected async sendAuthorizedRequest<Response>(
        config: AxiosRequestConfig,
        iteration = 0,
    ): Promise<AxiosResponse<Response>> {
        const token = await this.tokenManager.getToken();
        const authorizedConfig: AxiosRequestConfig = {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            return await this.sendRequest<Response>(authorizedConfig);
        } catch (e) {
            if (isAxiosError(e) && e.response?.data) {
                const { error } = e.response.data as { error: string | undefined };

                if (error === 'ExpiredTokenError' && iteration < 3) {
                    await this.tokenManager.refreshTokens(this.http);
                    return this.sendAuthorizedRequest<Response>(config, iteration + 1);
                }
            }

            throw e;
        }
    }

    protected async sendRequest<Response>(config: AxiosRequestConfig): Promise<AxiosResponse<Response>> {
        return await this.http.request<Response>(config);
    }
}
