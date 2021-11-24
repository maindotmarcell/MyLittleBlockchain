"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
class Block {
    constructor(timestamp, transaction, minerReward, previousHash = '') {
        this._timestamp = timestamp;
        this._transaction = transaction;
        this._miningRewardTransaction = minerReward;
        this._previousHash = previousHash;
        this._hash = this.calculateHash();
        this._nonce = 0;
    }
    // getters
    get timestamp() {
        return this._timestamp;
    }
    get transaction() {
        return this._transaction;
    }
    get previousHash() {
        return this._previousHash;
    }
    get hash() {
        return this._hash;
    }
    get miningRewardTransaction() {
        return this._miningRewardTransaction;
    }
    // methods
    calculateHash() {
        return (0, crypto_js_1.SHA256)(this._previousHash + this._timestamp + this._transaction + this._miningRewardTransaction + this._nonce).toString();
    }
    mine(difficulty) {
        while (this._hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this._nonce++;
            this._hash = this.calculateHash();
        }
        console.log('Block mined: ' + this._hash);
    }
}
exports.default = Block;
