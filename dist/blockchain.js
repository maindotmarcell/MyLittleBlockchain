"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = __importDefault(require("./block"));
const transaction_1 = __importDefault(require("./transaction"));
class Blockchain {
    constructor() {
        this._chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    // getter
    get chain() {
        return this._chain;
    }
    // methods
    createGenesisBlock() {
        return new block_1.default('01/01/2017', []);
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new transaction_1.default(this.miningReward, miningRewardAddress);
        this.pendingTransactions.push(rewardTx);
        let block = new block_1.default(Date.now().toString(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!');
        this.chain.push(block);
        this.pendingTransactions = [];
    }
    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress)
            throw new Error('Transaction must include from and to address');
        if (!transaction.isValid())
            throw new Error('Cannor add invalid transaction to chain');
        this.pendingTransactions.push(transaction);
    }
    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.fromAddress === address)
                    balance -= transaction.amount;
                if (transaction.toAddress === address)
                    balance += transaction.amount;
            }
        }
        return balance;
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (!currentBlock.hasValidTransactions())
                return false;
            if (currentBlock.hash !== currentBlock.calculateHash())
                return false;
            if (currentBlock.previousHash !== previousBlock.hash)
                return false;
        }
        return true;
    }
}
exports.default = Blockchain;
