"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_js_1 = __importDefault(require("./blockchain.js"));
const transaction_js_1 = __importDefault(require("./transaction.js"));
let marciCoin = new blockchain_js_1.default();
marciCoin.createTransaction(new transaction_js_1.default(100, 'address2', 'address1'));
marciCoin.createTransaction(new transaction_js_1.default(50, 'address1', 'address2'));
console.log('Starting the miner...');
marciCoin.minePendingTransactions('Marci-address');
console.log(`\nMarci's balance is ${marciCoin.getBalanceOfAddress('Marci-address')} \n
address 1's balance is ${marciCoin.getBalanceOfAddress('address1')} \n
address 2's balance is ${marciCoin.getBalanceOfAddress('address2')} \n`);
console.log('Starting the miner again...');
marciCoin.minePendingTransactions('Marci-address');
console.log(`\nMarci's balance is ${marciCoin.getBalanceOfAddress('Marci-address')} \n
address 1's balance is ${marciCoin.getBalanceOfAddress('address1')} \n
address 2's balance is ${marciCoin.getBalanceOfAddress('address2')} \n`);
console.log(marciCoin.chain);
// console.log('Mining block 1...')
// marciCoin.addBlock(
// 	new Block(1, Date.toString(), { amount: 4 }, marciCoin.getLatestBlock().hash)
// );
// console.log('Mining block 2...')
// marciCoin.addBlock(
// 	new Block(2, Date.toString(), { amount: 12 }, marciCoin.getLatestBlock().hash)
// );
// console.log(JSON.stringify(marciCoin, null, 4));
// console.log(marciCoin.isChainValid());
// marciCoin.chain[1].data = { amount: 100};
// marciCoin.chain[1].hash = marciCoin.chain[1].calculateHash();
// console.log(JSON.stringify(marciCoin, null, 4));
// console.log(marciCoin.isChainValid());
