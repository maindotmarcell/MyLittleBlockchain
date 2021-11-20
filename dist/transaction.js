"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    constructor(amount, toAddress, fromAddress) {
        if (fromAddress !== null)
            this._fromAddress = null;
        else
            this._fromAddress = fromAddress;
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
}
exports.default = Transaction;
