import { TokenStorageInterface, TokenStorageItem } from '../shared/TokenStorageInterface';

export class MemoryTokenStorage implements TokenStorageInterface {
    tokens?: TokenStorageItem;
    get(): TokenStorageItem | undefined {
        return this.tokens;
    }

    remove(): void {
        this.tokens = undefined;
    }

    set(item: TokenStorageItem): void {
        this.tokens = item;
    }
}
