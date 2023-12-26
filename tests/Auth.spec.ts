import axios from 'axios';
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';

import { Auth } from '../src';

const expect = chai.expect;

chai.use(dirtyChai);
describe('Auth', () => {
    describe('authenticateWithGoogleCode', () => {
        it('should authenticate with Google Code successfully', async () => {
            const expectedAuthResult = { token: 'fake-auth-token', user: { id: 1, name: 'John Doe' } };
            const http = axios.create();
            sinon.stub(http, 'get').resolves({ data: expectedAuthResult, status: 200 });
            const sdk = new Auth({ http });
            const { auth: actualAuth, error } = await sdk.authenticateWithGoogleCode('fake-google-code');

            expect(error).to.be.undefined();
            expect(actualAuth).to.deep.equal(expectedAuthResult);
        });

        it('should handle authentication failure', async () => {
            const expectedAuthResult = { name: 'AuthenticationError', message: 'Invalid Google Code' };
            const http = axios.create();
            sinon.stub(http, 'get').resolves({ data: expectedAuthResult, status: 400 });
            const sdk = new Auth({ http });

            const { auth, error } = await sdk.authenticateWithGoogleCode('invalid-google-code');

            expect(auth).to.be.undefined();
            expect(error).to.deep.equal(expectedAuthResult);
        });
    });
});
