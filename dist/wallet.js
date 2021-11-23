"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elliptic_1 = __importDefault(require("elliptic"));
const transaction_1 = __importDefault(require("./transaction"));
const blockchain_1 = __importDefault(require("./blockchain"));
class Wallet {
    constructor() {
        const EC = new elliptic_1.default.ec('secp256k1');
        this._keyPair = EC.genKeyPair();
        this._privateKey = this._keyPair.getPrivate("hex");
        this._publicKey = this._keyPair.getPublic("hex");
    }
    get keyPair() {
        return this._keyPair;
    }
    // get privateKey() {
    //     return this._privateKey;
    // }
    get publicKey() {
        return this._publicKey;
    }
    sendMoney(amount, payee) {
        const tx = new transaction_1.default(amount, payee, this._publicKey);
        tx.signTransaction(this._keyPair);
        blockchain_1.default.instance.addTransaction(tx);
    }
}
exports.default = Wallet;
