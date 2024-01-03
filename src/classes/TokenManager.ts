import { AxiosInstance } from 'axios';

import { AuthResponse } from './Auth';
import { TokenStorageInterface, TokenStorageItem } from '../shared/TokenStorageInterface';

export class TokenManager {
    tokenStorage: TokenStorageInterface;

    constructor(tokenStorage: TokenStorageInterface) {
        this.tokenStorage = tokenStorage;
    }

    async getToken(): Promise<string | undefined> {
        const item = await this.tokenStorage.get();
        return item?.token;
    }

    async setToken(item: TokenStorageItem): Promise<void> {
        await this.tokenStorage.set(item);
    }

    async refreshTokens(http: AxiosInstance): Promise<string | null> {
        try {
            const item = await this.tokenStorage.get();
            const { data } = await http.post<AuthResponse>('/auth/refresh-token', item);
            const { token, refreshToken } = data;

            if (!token || !refreshToken) {
                return null;
            }
            await this.tokenStorage.set({ token, refreshToken });
            return token;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return null;
        }
    }
}
