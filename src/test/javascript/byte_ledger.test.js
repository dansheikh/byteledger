const {assert} = require('chai');
const {ByteLedger} = require('../../main/javascript/byte_ledger');

describe('Ledger', () => {
    let ledger;

    before(() => {
        ledger = new ByteLedger();
    });

    it('creates a transaction', () => {
        ledger.createTransaction('101', '010', 1000);
        let transaction = ledger.pending[0];
        assert.equal(ledger.pending.length, 1);
        assert.isObject(transaction);
        assert.property(transaction, 'vendor');
        assert.property(transaction, 'customer');
        assert.property(transaction, 'amount');
    });

    it('creates an entry', () => {
        let idx = ledger.createEntry();
        assert.equal(idx, 0);
        assert.equal(ledger.head, ledger.tail);
        assert.lengthOf(ledger.pending, 0);
        assert.isAtLeast(ledger.tail.nonce, 0);
        assert.isNotEmpty(ledger.tail.hash);
    });
});
