"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this._timestamp = timestamp;
        this._transactions = transactions;
        this._previousHash = previousHash;
        this._hash = this.calculateHash();
        this._nonce = 0;
    }
    // getters
    get timestamp() {
        return this._timestamp;
    }
    get transactions() {
        return this._transactions;
    }
    get previousHash() {
        return this._previousHash;
    }
    get hash() {
        return this._hash;
    }
    // methods
    calculateHash() {
        return (0, crypto_js_1.SHA256)(this._previousHash + this._timestamp + this._transactions + this._nonce).toString();
    }
    mineBlock(difficulty) {
        while (this._hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this._nonce++;
            this._hash = this.calculateHash();
        }
        console.log('Block mined: ' + this._hash);
    }
    hasValidTransactions() {
        for (let tx of this.transactions) {
            if (!tx.isValid())
                return false;
        }
        return true;
    }
}
exports.default = Block;
