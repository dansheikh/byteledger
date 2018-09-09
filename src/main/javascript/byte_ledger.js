'use strict';

const Entry = require('./byte_entry');

class ByteLedger {
    constructor(head = null, tail = null, pending = []) {
        this._head = head;
        this._tail = tail;
        this._pending = pending;
    }

    get head() {
        return this._head;
    }

    set head(byteEntry = null) {
        this._head = byteEntry;
    }

    get tail() {
        return this._tail;
    }

    set tail(byteEntry = null) {
        this._tail = byteEntry;
    }

    get pending() { return this._pending; }

    set pending(value) { this._pending = value; }

    createTransaction(vendor, customer, amount) {
        let transaction = {
            vendor: vendor,
            customer: customer,
            amount: amount
        };

        this._pending.push(transaction);
    }

    createEntry() {
        let index = 0;
        let previousEntryHash = '';
        let currentTail = this._tail;

        if (this._tail) {
            index = this._tail.index + 1;
            previousEntryHash = this._tail.previousEntryHash;
        }

        const entry = new Entry.ByteEntry(index, this._pending, previousEntryHash, 0, currentTail);

        if (this._head) {
            this._tail.next = entry;
            this._tail = entry;
        } else {
            this._tail = entry;
            this._head = entry;
        }

        this._pending = [];

        return index;
    }

}

exports.ByteLedger = ByteLedger;