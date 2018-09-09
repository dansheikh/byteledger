'use strict';

const Crypto = require('crypto-js');

class ByteEntry {
    constructor(index, data, previousEntryHash, nonce, previous, next = null) {
        this._index = index;
        this._timestamp = Date.now();
        this._data = data;
        this._previousEntryHash = previousEntryHash;
        this._nonce = nonce;
        this._previous = previous;
        this._next = next;
        this._hash = this.generateHash(data, previousEntryHash, nonce);

        this.pow();
    }

    get index() { return this._index; }
    get data() { return this._data; }
    get previousEntryHash() { return this._previousEntryHash; }
    get nonce() { return this._nonce; }
    get previous() { return this._previous; }
    set previous(entry) { this._previous = entry; }
    get next() { return this._next; }
    set next(entry) { this._next = entry; }
    get hash() { return this._hash; }

    increaseNonce() {
        this._nonce = this._nonce + 1;
    }

    toString() {
        const classObject = {
            "index": this._index,
            "timestamp": this._timestamp,
            "data": this._data,
            "previousEntryHash": this._previousEntryHash,
            "nonce": this._nonce
        }

        return JSON.stringify(classObject);
    }

    generateHash() {
        const input = this._previousEntryHash + this._nonce.toString() + this.toString();
        const hash = Crypto.SHA256(input);
        return hash.toString(Crypto.enc.Base64);
    }

    pow() {
        let hash = this.generateHash();

        while (hash.substring(0, 2) !== '00') {
            this.increaseNonce();
            hash = this.generateHash();
        }

        this._hash = hash;
    }

}

exports.ByteEntry = ByteEntry;