import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

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

    protected async sendAuthorizedRequest<Response>(config: AxiosRequestConfig): Promise<AxiosResponse<Response>> {
        const token = await this.tokenManager.getToken();
        const authorizedConfig: AxiosRequestConfig = {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            },
        };
        return this.sendRequest<Response>(authorizedConfig);
    }

    protected async sendRequest<Response>(config: AxiosRequestConfig): Promise<AxiosResponse<Response>> {
        return await this.http.request<Response>(config);
    }
}
