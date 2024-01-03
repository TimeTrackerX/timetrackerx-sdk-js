export interface TokenStorageItem {
    token: string;
    refreshToken: string;
}
export interface TokenStorageInterface {
    set: (item: TokenStorageItem) => void | Promise<void>;
    get: () => undefined | null | TokenStorageItem | Promise<undefined | null | TokenStorageItem>;
    remove: () => void | Promise<void>;
}
