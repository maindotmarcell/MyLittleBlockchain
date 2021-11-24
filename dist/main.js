"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_js_1 = __importDefault(require("./blockchain.js"));
const wallet_js_1 = __importDefault(require("./wallet.js"));
const satoshi_nakamoto_js_1 = __importDefault(require("./satoshi_nakamoto.js"));
// const EC = new ec.ec('secp256k1');
// const myKey = EC.keyFromPrivate('583a4ab8d9c4632c9decd1ed6b8f7ad7242420032b4de3656da5ca3904bb38ea');
// const myKey = EC.genKeyPair();
// const myPrivateKey = myKey.getPrivate('hex');
// const myPublicKey = myKey.getPublic('hex');
// console.log(`Public key is: ${myWalletAddress}`);
let marciCoin = blockchain_js_1.default.instance;
const satoshi = satoshi_nakamoto_js_1.default.instance;
const marci = new wallet_js_1.default();
const peti = new wallet_js_1.default();
satoshi.sendMoney(10, marci.publicKey);
// const tx1 = new Transaction(10, 'public key goes here', myPublicKey);
// tx1.signTransaction(myKey);
// marciCoin.addTransaction(tx1);
// peti.sendMoney(10,marci.publicKey);
// const tx2 = new Transaction(10, 'public key goes here', myPublicKey);
// tx2.signTransaction(myKey);
// marciCoin.addTransaction(tx2);
console.log('Starting the miner...');
marciCoin.minePendingTransaction(peti.publicKey);
// console.log(`\nMy public key is: ${myPublicKey}
// \nMy private key is: ${myPrivateKey}`);
console.log('\nBalance of Satoshi is: ' + marciCoin.getBalanceOfAddress(satoshi.publicKey));
console.log('\nBalance of Marcell is: ' + marciCoin.getBalanceOfAddress(marci.publicKey));
console.log('\nBalance of Peti is: ' + marciCoin.getBalanceOfAddress(peti.publicKey));
console.log('\nIs chain valid? ' + marciCoin.isChainValid() + '\n');
console.log(marciCoin.chain);
