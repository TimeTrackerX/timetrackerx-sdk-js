import { BaseClass, ClassParams } from '../shared/BaseClass';

export interface AuthUser {
    id: number;
    name: string;
    profile_img_url?: string;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
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

export class Auth extends BaseClass {
    constructor(params: ClassParams) {
        super(params);
        // istanbul ignore next
        this.http.defaults.validateStatus = status => status > 199 && status < 600;
    }

    async authenticateWithGoogleCode(code: string): Promise<AuthResult> {
        const uri = '/auth/google/callback';
        const params = { code };
        const { data, status } = await this.sendRequest<AuthResponse>({
            method: 'get',
            url: uri,
            params,
        });
        if (status !== 200) {
            return { auth: undefined, error: data as unknown as AuthError };
        }
        await this.tokenManager.setToken({
            token: data.token,
            refreshToken: data.refreshToken,
        });
        return { auth: data as AuthResponse, error: undefined };
    }
}
