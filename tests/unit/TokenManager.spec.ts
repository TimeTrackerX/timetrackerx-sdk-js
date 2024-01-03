import axios, { AxiosInstance } from 'axios';
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinon, { SinonStubbedInstance } from 'sinon';

import { AuthResponse, TokenManager } from '../../src';
import { MemoryTokenStorage } from '../../src/classes/MemoryTokenStorage';

const expect = chai.expect;
chai.use(dirtyChai);
type StubbedAxiosInstance = SinonStubbedInstance<AxiosInstance>;

describe('TokenManager', () => {
    let manager: TokenManager;
    let httpStub: StubbedAxiosInstance;
    const autResponse: AuthResponse = {
        token: 'token123',
        refreshToken: 'refreshToken456',
        user: {
            id: 0,
            name: 'user name',
        },
    };
    beforeEach(() => {
        httpStub = sinon.stub<AxiosInstance>(axios.create());
        manager = new TokenManager(new MemoryTokenStorage());
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('->refreshTokens()', () => {
        describe('when successful', () => {
            it('returns new tokens', async () => {
                httpStub.post.resolves({ data: autResponse });
                const refresh = await manager.refreshTokens(httpStub);
                const tokens = await manager.tokenStorage.get();
                expect(refresh).to.equal(autResponse.token);
                expect(tokens).to.deep.equal({
                    token: autResponse.token,
                    refreshToken: autResponse.refreshToken,
                });
            });
        });
        describe('when response if malformed', () => {
            it('returns null', async () => {
                httpStub.post.resolves({ data: new Error('Refresh Error') });
                const refresh = await manager.refreshTokens(httpStub);
                expect(refresh).to.be.null();
            });
        });
        describe('when fetching throw errors', () => {
            it('returns null', async () => {
                httpStub.post.rejects({ data: new Error('Refresh Error') });
                const refresh = await manager.refreshTokens(httpStub);
                expect(refresh).to.be.null();
            });
        });
    });
});
