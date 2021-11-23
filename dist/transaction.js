"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const elliptic_1 = require("elliptic");
const EC = new elliptic_1.ec('secp256k1');
class Transaction {
    constructor(amount, toAddress, fromAddress) {
        if (fromAddress !== undefined)
            this._fromAddress = fromAddress;
        else
            this._fromAddress = undefined;
        this._toAddress = toAddress;
        this._amount = amount;
    }
    // getters
    get fromAddress() {
        return this._fromAddress;
    }
    get toAddress() {
        return this._toAddress;
    }
    get amount() {
        return this._amount;
    }
    // method
    calculateHash() {
        if (this.fromAddress !== null)
            return (0, crypto_js_1.SHA256)(this.fromAddress + '' + this.toAddress + this.amount).toString();
        else
            return (0, crypto_js_1.SHA256)(this.toAddress + '' + this.amount).toString();
    }
    signTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress)
            throw new Error('You cannot sign transactions for other wallets.');
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }
    isValid() {
        if (this.fromAddress === undefined)
            return true;
        if (!this.signature || this.signature.length === 0)
            throw new Error('No signature in this transaction.');
        const publicKey = EC.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}
exports.default = Transaction;
