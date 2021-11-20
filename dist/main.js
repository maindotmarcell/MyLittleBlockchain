"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_js_1 = __importDefault(require("./block.js"));
const blockchain_js_1 = __importDefault(require("./blockchain.js"));
let marciCoin = new blockchain_js_1.default();
console.log('Mining block 1...');
marciCoin.addBlock(new block_js_1.default(1, Date.toString(), { amount: 4 }, marciCoin.getLatestBlock().hash));
console.log('Mining block 2...');
marciCoin.addBlock(new block_js_1.default(2, Date.toString(), { amount: 12 }, marciCoin.getLatestBlock().hash));
console.log(JSON.stringify(marciCoin, null, 4));
console.log(marciCoin.isChainValid());
marciCoin.chain[1].data = { amount: 100 };
marciCoin.chain[1].hash = marciCoin.chain[1].calculateHash();
console.log(JSON.stringify(marciCoin, null, 4));
console.log(marciCoin.isChainValid());
