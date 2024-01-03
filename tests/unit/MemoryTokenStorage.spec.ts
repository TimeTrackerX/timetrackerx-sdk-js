import chai from 'chai';
import dirtyChai from 'dirty-chai';

import { MemoryTokenStorage } from '../../src/classes/MemoryTokenStorage';

const expect = chai.expect;
chai.use(dirtyChai);

describe('MemoryTokenStorage', () => {
    let storage: MemoryTokenStorage;
    beforeEach(() => {
        storage = new MemoryTokenStorage();
    });

    describe('->get()', () => {
        it('should return undefined when no tokens exist', () => {
            expect(storage.get()).to.be.undefined();
        });

        it('should return tokens when they exist', () => {
            const tokens = {
                token: 'token123',
                refreshToken: 'refreshToken456',
            };
            storage.set(tokens);
            expect(storage.get()).to.deep.equal(tokens);
        });
    });

    describe('->set()', () => {
        it('should set tokens to be retrieve later', () => {
            const tokens = {
                token: 'token1234',
                refreshToken: 'refreshToken4567',
            };
            storage.set(tokens);
            expect(storage.get()).to.deep.equal(tokens);
        });
    });

    describe('->remove()', () => {
        it('should remove tokens', () => {
            const tokens = {
                token: 'token12',
                refreshToken: 'refreshToken45',
            };
            storage.set(tokens);
            expect(storage.get()).to.deep.equal(tokens);
            storage.remove();
            expect(storage.get()).to.be.undefined();
        });
    });
});
