import axios, { AxiosInstance } from 'axios';
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinon, { SinonStubbedInstance } from 'sinon';

import { Auth } from '../../src';

const expect = chai.expect;

chai.use(dirtyChai);
describe('Auth', () => {
    let apiClass: Auth;
    let httpStub: SinonStubbedInstance<AxiosInstance>;
    beforeEach(() => {
        httpStub = sinon.stub<AxiosInstance>(axios.create());
        apiClass = new Auth({ http: httpStub });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('->authenticateWithGoogleCode()', () => {
        it('should authenticate with Google Code successfully', async () => {
            const expectedAuthResult = { token: 'fake-auth-token', user: { id: 1, name: 'John Doe' } };
            httpStub.request.resolves({ data: expectedAuthResult, status: 200 });
            const { auth: actualAuth, error } = await apiClass.authenticateWithGoogleCode('fake-google-code');

            expect(error).to.be.undefined();
            expect(actualAuth).to.deep.equal(expectedAuthResult);
        });

        it('should handle authentication failure', async () => {
            const expectedAuthResult = { name: 'AuthenticationError', message: 'Invalid Google Code' };
            httpStub.request.resolves({ data: expectedAuthResult, status: 400 });

            const { auth, error } = await apiClass.authenticateWithGoogleCode('invalid-google-code');

            expect(auth).to.be.undefined();
            expect(error).to.deep.equal(expectedAuthResult);
        });
    });
});
