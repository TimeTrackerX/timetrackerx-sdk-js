import { BaseClass, ClassParams } from '../shared/BaseClass';

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

export class Auth extends BaseClass {
    constructor(params: ClassParams) {
        super(params);
        // istanbul ignore next
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
